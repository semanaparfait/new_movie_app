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
import NodeCache  from 'node-cache';
import axios from "axios";





dotenv.config();
const isNeon = process.env.DATABASE_URL?.includes("neon.tech");
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads', {
  maxAge: '30d', // cache for 30 days
  etag: false,   // optional, reduces overhead
}));
app.use(cors({
  origin: [
    'http://localhost:5173', // React dev
    'https://new-movie-app-1.onrender.com', // deployed frontend
    'https://movieland.me'
  ],
  credentials: true,
}));
const router = express.Router();
app.use(router);

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
  
  // console.log('Token received:', token); // Debug log
  
  // 4. If no token is found in either location, deny access.
  if (!token) {
    console.error('No token provided'); // Debug log
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  // 5. Verify the token.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', decoded); // Debug log
    req.user = decoded; // Attaches user info to the request object
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message); // Debug log
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

const cache = new NodeCache({ stdTTL: 3600 });
// Debug: store last forwarded webhook payload/status for troubleshooting
let lastForwardedWebhook = null;
// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, email,  password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required' });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    await pool.query(
      'INSERT INTO accountusers (username, email,  password) VALUES ($1, $2, $3)',
      [username, email,  hashedPassword]
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
      { id: user.id, email: user.email, username: user.username, phonenumber: user.phonenumber, created_at: user.created_at, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
        console.log("JWT generated:", token);
console.log("Setting cookie session_token...");

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
// app.get("/api/me", authenticateToken, (req, res) => {
//   const { id, username, phonenumber, email, created_at, is_admin } = req.user;
//   res.json({ id, username, phonenumber,email, created_at, is_admin });
// });
// ----------------it works like api/me-----------
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader && authHeader.split(' ')[1];
  const cookieToken = req.cookies.session_token;
  const token = bearerToken || cookieToken;

  if (!token) {
    req.user = null;
    return next(); // Proceed as guest
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    console.warn('Invalid token, treating as guest');
    req.user = null;
  }

  next();
}

app.get("/api/me", optionalAuth, (req, res) => {
  if (!req.user) {
    return res.json({ user: null }); // Guest response
  }

  const { id, username, phonenumber, email, created_at, is_admin } = req.user;
  res.json({ id, username, phonenumber, email, created_at, is_admin  });
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
    const { category_name ,main_category,categoryimageURL  } = req.body;
    if (!category_name || !main_category) {
  return res.status(400).json({ error: "All fields are required" });
}

    // const categoryImage = req.file ? req.file.filename : null;
    const categoryImage = req.file ? req.file.filename : categoryimageURL || null;


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

// const axios = require("axios"); // make sure axios is imported

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
    cache.del('moviesData');

    const savedMovie = result.rows[0];
    // Build an enriched payload for the webhook so downstream flows (emails) have all fields
    let categoryName = null;
    try {
      if (savedMovie.category_id) {
        const catRes = await pool.query('SELECT category_name FROM categories WHERE category_id = $1', [savedMovie.category_id]);
        if (catRes.rows.length) categoryName = catRes.rows[0].category_name;
      }
    } catch (e) {
      console.warn('Failed to fetch category name for webhook payload:', e.message);
    }

    const backendBase = process.env.BACKEND_BASE_URL || '';
    const imageUrl = savedMovie.movie_image
      ? (savedMovie.movie_image.startsWith('http') ? savedMovie.movie_image : `${backendBase}/uploads/${savedMovie.movie_image}`)
      : null;

    const webhookPayload = {
      movie_id: savedMovie.movie_id,
      movie_name: savedMovie.movie_name,
      movie_image: imageUrl,
      movie_genre: savedMovie.movie_genre,
      movie_country: savedMovie.movie_country,
      movie_released_date: savedMovie.movie_released_date,
      category_name: categoryName,
      created_at: savedMovie.created_at,
      category_id: savedMovie.category_id,
      movie_trailer_link: savedMovie.movie_trailer_link,
      movie_video_link: savedMovie.movie_video_link,
      // include full DB row for flexibility
      _raw: savedMovie,
    };

    // ✅ Forward enriched payload to configured webhook (non-blocking)
    try {
      const forwardUrl = process.env.WEBHOOK_FORWARD_URL;
      axios.post(forwardUrl, webhookPayload, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(() => {
          console.log("Movie forwarded to webhook:", forwardUrl);
          lastForwardedWebhook = { payload: webhookPayload, forwardedTo: forwardUrl, status: 'ok', time: new Date().toISOString() };
        })
        .catch((webhookError) => {
          console.warn("Webhook forward failed:", webhookError.message);
          lastForwardedWebhook = { payload: webhookPayload, forwardedTo: forwardUrl, status: 'error', error: webhookError.message, time: new Date().toISOString() };
        });
    } catch (e) {
      console.warn("Webhook forwarding configuration error:", e.message);
      lastForwardedWebhook = { payload: webhookPayload, forwardedTo: null, status: 'config_error', error: e.message, time: new Date().toISOString() };
    }

    res.status(201).json({ movie: savedMovie, message: "Movie uploaded successfully" });
  } catch (error) {
    console.error("Error uploading movie", error);
    res.status(500).json({ err: "Failed to insert movie" });
  }
});

// -----------------deleting category----------
app.delete('/api/categories/:id', async (req, res) => {
  const { id } = req.params; // this is the movie_id from the URL
  if (!id) {
    return res.status(400).json({ message: 'category ID is required' });
  }
  try {
    const result = await pool.query(
      'DELETE FROM categories WHERE category_id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'category not found' });
    }
    // Clear categories cache
    cache.del('agasobanuyeData');
    cache.del('izidasobanuyeData');

    res.status(200).json({ success: true, message: 'category deleted', category: result.rows[0] });
  } catch (err) {
    console.error('Error deleting movie:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});
// ----------------fetching izidasobanuye--------
app.get('/api/izidasobanuye', async (req, res) => {
  const cachedIzidasobanuye = cache.get('izidasobanuyeData');
  if (cachedIzidasobanuye) {
    return res.status(200).json(cachedIzidasobanuye);
  }

  try {
    const result = await pool.query(
      'SELECT * FROM categories WHERE main_category = $1',
      ['izidasobanuye']
    );

    // Cache the data before sending the response
    // cache.set('izidasobanuyeData', result.rows, 3600); // 1 hour TTL
    cache.set('izidasobanuyeData', result.rows);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching izidasobanuye category", error);
    res.status(500).json({ err: "Failed to fetch izidasobanuye category" });
  }
});

// ----------------fetching agasobanuye--------
app.get('/api/agasobanuye', async(req,res) => {
  const cachedAgasobanuye = cache.get('agasobanuyeData');
  if (cachedAgasobanuye) {
    return res.status(200).json(cachedAgasobanuye);
  }
  try {
const result = await pool.query(
  'SELECT * FROM categories WHERE main_category = $1',
  ['agasobanuye']
);
// Cache the data before sending the response
cache.set('agasobanuyeData', result.rows); // 1 hour TTL

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("error fetching agasobanuye category", error)
    res.status(500).json({ err: "Failed to fetch agasobanuye category" });
    
  }
})
// ----------------fetching movies--------
app.get('/api/movies', async(req,res) => {
  const cachedMovies = cache.get('moviesData');
  if (cachedMovies) {
    return res.status(200).json(cachedMovies);
  }
  try{
const query = `
      SELECT 
        m.movie_id, m.movie_name, m.movie_description, m.movie_trailer_link,m.movie_image,m.movie_country,m.movie_genre,m.movie_released_date,m.movie_video_link,m.movie_download_link,m.created_at,
        c.category_name,m.category_id
      FROM movies m
      LEFT JOIN categories c ON m.category_id = c.category_id
      ORDER BY m.movie_id DESC;
    `;
    const result = await pool.query(query);
    // Cache the data before sending the response
    cache.set('moviesData', result.rows, 3600); // 1 hour TTL
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("error fetching movies category", error)
    res.status(500).json({ err: "Failed to fetch movies category" });
    
  }
})
// ----------------fetching single movie--------
// Get a single movie by ID
app.get('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        m.movie_id, m.movie_name, m.movie_description, m.movie_trailer_link, m.movie_image,
        m.movie_country, m.movie_genre, m.movie_released_date, m.movie_video_link, m.movie_download_link,
        c.category_name, m.category_id
      FROM movies m
      LEFT JOIN categories c ON m.category_id = c.category_id
      WHERE m.movie_id = $1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching movie by ID:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// -----------------deleting movie----------
app.delete('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'movie ID is required' });

  try {
    const result = await pool.query(
      'DELETE FROM movies WHERE movie_id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ success: false, message: 'movie not found' });

    // Clear movies cache
    cache.del('moviesData');

    res.status(200).json({ success: true, message: 'movie deleted', movie: result.rows[0] });
  } catch (err) {
    console.error('Error deleting movie:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

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
      'SELECT * FROM accountusers WHERE is_admin = true'
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

// Add a placeholder route for /account to handle 404 errors
app.get('/account', (req, res) => {
  res.status(200).json({ message: 'Account route placeholder' });
});

// -------------------upload sesions -----------
app.post('/api/seasons', upload.single("season_image"), async (req, res) => {
  try {
    const { season_name, season_number, season_description, season_trailer_link, season_date, season_imagelink, season_genre,season_provider_choice } = req.body;

    if (!season_name || !season_description || !season_trailer_link) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const serie_image = req.file ? req.file.filename : season_imagelink || null;

    const result = await pool.query(
      `INSERT INTO series 
       (serie_name, serie_number, serie_image, serie_description, serie_trailer_link, serie_released_date, serie_genre,provider)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [season_name, season_number || null, serie_image, season_description, season_trailer_link, season_date || null, season_genre || null ,season_provider_choice]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error uploading season:", err);
    res.status(500).json({ error: "Failed to upload season" });
  }
});
// -------------------select all seasons----------
app.get('/api/seasons', async(req,res) => {
  try {
    const result = await pool.query(
      `SELECT 
        s.*,
        c.category_name
      FROM series s
      LEFT JOIN categories c ON s.provider = c.category_id;

      `
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching seasons:', err);
    res.status(500).json({ message: 'Server error fetching seasons' });
  }
});

// --------------------upload episodes---------------
app.post("/api/episodes", async (req, res) => {
  try {
    const {
      serie_id,
      episode_number,
      episode_video_link,
      episode_download_link,
      episode_country,
      episode_released_date,
    } = req.body;

    if (!serie_id || !episode_number || !episode_video_link) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const result = await pool.query(
      `INSERT INTO episodes 
       (serie_id, episode_number, episode_video_link, episode_download_link, episode_country, episode_released_date) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        serie_id,
        episode_number,
        episode_video_link,
        episode_download_link,
        episode_country,
        episode_released_date,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error uploading episodes:", err);
    res.status(500).json({ error: "Failed to upload episodes" });
  }
});
// ------------------geting episodes with seasond and category---------
app.get('/api/episodes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        e.*,
        s.*,
        c.category_name
      FROM episodes e
      JOIN series s ON e.serie_id = s.serie_id
      LEFT JOIN categories c ON s.provider = c.category_id

    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching episodess:', err);
    res.status(500).json({ message: 'Server error fetching episodes' });
  }
});
// --------------------get single seasons wth its eps-----------
app.get('/api/episodes/:id', async (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      e.*,
      s.*,
      c.category_name
    FROM episodes e
    JOIN series s ON e.serie_id = s.serie_id
    LEFT JOIN categories c ON s.provider = c.category_id
    WHERE s.serie_id = $1
    ORDER BY e.episode_number ASC
  `;

  const result = await pool.query(query, [id]);
  res.status(200).json(result.rows);
});

// ------------------------the single episode---------
app.get('/api/episode/:episodeid' ,  async(req,res)=>{
  const {episodeid} =req.params;
  try {
    const query=(`
      SELECT 
        e.*,
        s.*
      FROM episodes e
      JOIN series s ON e.serie_id = s.serie_id
      WHERE e.episode_id = $1
      LIMIT 1

    `);
    const result = await pool.query(query, [episodeid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Episode not found' });
    }

    // ✅ Return a single object instead of array
    res.status(200).json(result.rows[0]);

  } catch (err) {
    console.error('Error fetching single on serie id episodes:', err);
    res.status(500).json({ message: 'Server error fetching single on serie id episodes' });
  }
})
app.delete('/api/episode/:episodeid', async(req,res) =>{
    const { episodeid } = req.params;
  if (!episodeid) return res.status(400).json({ message: 'episode ID is required' });

  try {
    const result = await pool.query(
      'DELETE FROM episodes WHERE episode_id = $1 RETURNING *',
      [episodeid]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ success: false, message: 'episode not found' });

    // Clear movies cache
    // cache.del('moviesData');

    // CORRECT
res.status(200).json({ success: true, message: 'episode deleted', episode: result.rows[0] });
  } catch (err) {
    console.error('Error deleting episode:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }

});
// ---------------updating episode ---------
// ---------------updating episode ---------
app.patch('/api/episode/:episodeid', async (req, res) => {
  const { episodeid } = req.params;
  const {
    episode_number,
    episode_video_link,
    episode_download_link,
    episode_country,
    episode_released_date
  } = req.body;

  try {
    // Check if episode exists
    const existing = await pool.query('SELECT * FROM episodes WHERE episode_id = $1', [episodeid]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Episode not found' });
    }

    // Build dynamic update query
    const fields = [];
    const values = [];
    let count = 1;

    if (episode_number) {
      fields.push(`episode_number = $${count++}`);
      values.push(episode_number);
    }
    if (episode_video_link) {
      fields.push(`episode_video_link = $${count++}`);
      values.push(episode_video_link);
    }
    if (episode_download_link) {
      fields.push(`episode_download_link = $${count++}`);
      values.push(episode_download_link);
    }
    if (episode_country) {
      fields.push(`episode_country = $${count++}`);
      values.push(episode_country);
    }
    if (episode_released_date) {
      fields.push(`episode_released_date = $${count++}`);
      values.push(episode_released_date);
    }

    // If no field to update
    if (fields.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields provided for update' });
    }

    const query = `
      UPDATE episodes 
      SET ${fields.join(', ')}
      WHERE episode_id = $${count}
      RETURNING *;
    `;
    values.push(episodeid);

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      message: 'Episode updated successfully',
      episode: result.rows[0]
    });
  } catch (err) {
    console.error('Error updating episode:', err);
    res.status(500).json({ success: false, message: 'Server error updating episode' });
  }
});

// --------------------get all episodes and series----------
// Admin debug endpoint: return last forwarded webhook info
app.get('/admin/last-webhook', (req, res) => {
  if (!lastForwardedWebhook) return res.status(404).json({ message: 'No webhook forwarding recorded yet' });
  return res.json(lastForwardedWebhook);
});

// API namespaced version (avoid CDN/static hijack) with no-cache headers
app.get('/api/admin/last-webhook', (req, res) => {
  res.set('Cache-Control', 'no-store, must-revalidate');
  if (!lastForwardedWebhook) return res.status(404).json({ message: 'No webhook forwarding recorded yet' });
  return res.json(lastForwardedWebhook);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

