import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import multer from 'multer'
import fs from "fs";
import jwt from 'jsonwebtoken';
import { error } from 'console';



dotenv.config();
const isNeon = process.env.DATABASE_URL?.includes("neon.tech");
const app = express();
app.use(cookieParser());

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: [
    'http://localhost:5173', // React dev
    'https://new-movie-app.onrender.com' // deployed frontend
  ],
  credentials: true,
}));
const { Pool } = pg; // Destructure Pool from pg
// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isNeon
    ? { rejectUnauthorized: false }
    : false,
});

// const local = new pg.Pool({
//   connectionString: process.env.LOCAL_UR,
// });
// setting up upload storage 

// Middleware to verify JWT from cookie
function authenticateToken(req, res, next) {
  // 1. Check for a bearer token in the Authorization header.
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader && authHeader.split(' ')[1]; // Extracts the token after 'Bearer'

  // 2. Check for a token in the cookies.
  const cookieToken = req.cookies.session_token;

  // 3. Determine which token to use.
  const token = bearerToken || cookieToken;

  // 4. If no token is found in either location, deny access.
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // 5. Verify the token.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attaches user info to the request object
    next();
  } catch (err) {
    // This catch block handles invalid, expired, or malformed tokens.
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, email, phonenumber, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required' });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    await pool.query(
      'INSERT INTO accountusers (username, email, phonenumber, password) VALUES ($1, $2, $3, $4)',
      [username, email, phonenumber, hashedPassword]
    );
    

    res.status(201).send({ message: 'User created successfully' });

  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // unique violation
      res.status(400).json({ message: 'Username or email already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    console.log('Login attempt, body:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'email and password are required' });
    }

    console.log('Querying user...');
    const result = await pool.query('SELECT * FROM accountusers WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    console.log('User found:', user);

    console.log('Checking password...');
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Generating JWT token...');
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not set in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, phonenumber: user.phonenumber, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('session_token', token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site prod, 'lax' for local
      secure: isProduction // must be true for 'none'
    });

    res.json({ 
        message: 'Login successful',
        is_admin: user.is_admin // Include the is_admin field
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// getting the logged in user
app.get("/api/me", authenticateToken, (req, res) => {
  const { id, username, phonenumber, email } = req.user;
  res.json({ id, username, phonenumber,email });
});

// -----logout-----------
app.post("/api/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("session_token", {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });
  return res.json({ message: "Logged out successfully" });
});

// for admin
app.get('/api/admin/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM accountusers'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// --------------upload-----------category===========
app.post("/api/categories", upload.single("category_image"), async (req, res) => {
  try {
    const { category_name ,main_category  } = req.body;
    if (!category_name || !main_category) {
  return res.status(400).json({ error: "All fields are required" });
}

    const categoryImage = req.file ? req.file.filename : null;

    const result = await pool.query(
      `INSERT INTO categories (category_name, category_image , main_category)
       VALUES ($1, $2, $3) RETURNING *`,
      [category_name, categoryImage ,main_category]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error uploading category:", err);
    res.status(500).json({ error: "Failed to upload category" });
  }
});
// getting all categories
app.get('/api/categories', async (req,res) => {
  try {
        const result = await pool.query(
      'SELECT * FROM categories'
    );
    res.status(200).json(result.rows);
    
} catch (err) {
  console.error("Error fetching categories:", err);
  res.status(500).json({ error: "Failed to fetch categories" });
}

})
// ---------------uploading the movie------------
// app.post('/api/movieupload', upload.single('movie_image'), async (req, res) => {
//   try {
//     const {
//       movie_name,
//       movie_description,
//       movie_country,
//       movie_genre,
//       movie_released_date,
//       movie_video_link,
//       movie_download_link,
//       movie_trailer_link,
//       category_id, // include this if you want to link to categories
//     } = req.body;

//     // const movie_image = req.file ? req.file.filename : null;
//     const movie_image = req.file ? req.file.filename : movie_image_url || null;

//     if (!movie_name || !movie_image || !movie_description) {
//       return res.status(400).json({ error: "Movie name, description, and poster are required" });
//     }

//     const query = `
//       INSERT INTO movies 
//         (movie_name, movie_image, movie_description, movie_country, category_id,
//          movie_genre, movie_released_date, movie_video_link, movie_download_link, movie_trailer_link)
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
//       RETURNING *;
//     `;

//     const values = [
//       movie_name,
//       movie_image,
//       movie_description,
//       movie_country || null,
//       category_id ? parseInt(category_id) : null,
//       movie_genre || null,
//       movie_released_date || null,
//       movie_video_link || null,
//       movie_download_link || null,
//       movie_trailer_link || null,
//     ];

//     const result = await pool.query(query, values);

//     res.status(201).json({ movie: result.rows[0], message: "Movie uploaded successfully" });
//   } catch (error) {
//     console.error("Error uploading movie", error);
//     res.status(500).json({ err: "Failed to insert movie" });
//   }
// });

app.post('/api/movieupload', upload.single('movie_image'), async (req, res) => {
  try {
    const {
      movie_name,
      movie_description,
      movie_country,
      movie_genre,
      movie_released_date,
      movie_video_link,
      movie_download_link,
      movie_trailer_link,
      category_id,
      movieposterURL, // <- grab the URL from frontend
    } = req.body;

    // Use uploaded file if exists, otherwise fallback to URL
    const movie_image = req.file ? req.file.filename : movieposterURL || null;

    if (!movie_name || !movie_image || !movie_description) {
      return res.status(400).json({ error: "Movie name, description, and poster are required" });
    }

    const query = `
      INSERT INTO movies 
        (movie_name, movie_image, movie_description, movie_country, category_id,
         movie_genre, movie_released_date, movie_video_link, movie_download_link, movie_trailer_link)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;

    const values = [
      movie_name,
      movie_image,
      movie_description,
      movie_country || null,
      category_id ? parseInt(category_id) : null,
      movie_genre || null,
      movie_released_date || null,
      movie_video_link || null,
      movie_download_link || null,
      movie_trailer_link || null,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({ movie: result.rows[0], message: "Movie uploaded successfully" });
  } catch (error) {
    console.error("Error uploading movie", error);
    res.status(500).json({ err: "Failed to insert movie" });
  }
});

// ----------------fetching izidasobanuye--------
app.get('/api/izidasobanuye', async(req,res) => {
  try {
const result = await pool.query(
  'SELECT * FROM categories WHERE main_category = $1',
  ['izidasobanuye']
);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("error fetching izidasobanuye category", error)
    res.status(500).json({ err: "Failed to fetch izidasobanuye category" });
    
  }
})
// ----------------fetching agasobanuye--------
app.get('/api/agasobanuye', async(req,res) => {
  try {
const result = await pool.query(
  'SELECT * FROM categories WHERE main_category = $1',
  ['agasobanuye']
);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("error fetching agasobanuye category", error)
    res.status(500).json({ err: "Failed to fetch agasobanuye category" });
    
  }
})
// ----------------fetching movies--------
app.get('/api/movies', async(req,res) => {
  try{
const query = `
      SELECT 
        m.movie_id, m.movie_name, m.movie_description, m.movie_trailer_link,m.movie_image,m.movie_country,m.movie_genre,m.movie_released_date,m.movie_video_link,m.movie_download_link,
        c.category_name,m.category_id
      FROM movies m
      LEFT JOIN categories c ON m.category_id = c.category_id
    `;
     const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("error fetching movies category", error)
    res.status(500).json({ err: "Failed to fetch movies category" });
    
  }
})
// -----------------addding to watchlist----------
// -----------------add to watchlist----------
app.post("/api/watchlist", async (req, res) => {
  const { user_id, movie_id } = req.body;
  try {
    await pool.query(
      `INSERT INTO watchlist (user_id, movie_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [user_id, movie_id]
    );
    res.json({ success: true, message: "Movie added to watchlist" });
  } catch (err) {
    console.error("Error adding to watchlist:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------get user's watchlist---------
app.get("/api/watchlist/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT m.* 
       FROM movies m
       JOIN watchlist w ON m.movie_id = w.movie_id
       WHERE w.user_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching watchlist:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --------------delete movie from watchlist----
app.delete("/api/watchlist", async (req, res) => {
  const { user_id, movie_id } = req.body;
  try {
    await pool.query(
      "DELETE FROM watchlist WHERE user_id = $1 AND movie_id = $2",
      [user_id, movie_id]
    );
    res.json({ success: true, message: "Movie removed from watchlist" });
  } catch (err) {
    console.error("Error deleting from watchlist:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
// -------------------------admins------------
// fetching only admins
app.get('/api/admin/admins', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, phonenumber, password, created_at , is_admin FROM users WHERE is_admin = true'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// PUT /api/users/:id/status
app.put('/api/users/:id/status', async (req, res) => {
  const { id } = req.params;
  const { is_admin } = req.body;

  try {
    const result = await pool.query(
      'UPDATE accountusers SET is_admin = $1 WHERE id = $2',
      [is_admin, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// admin deleting------
// DELETE /api/users/:id
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error deleting user' });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

