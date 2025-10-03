import express from 'express';
import pg from 'pg';
import multer from 'multer';
import fs from 'fs';



const app = express();
const { Pool } = pg;
app.use('/uploads', express.static('uploads', {
  maxAge: '30d', // cache for 30 days
  etag: false,   // optional, reduces overhead
}));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isNeon
  ? { rejectUnauthorized: false }
  : false,
});

const upload = multer({ storage });


app.post('/api/seasons', upload.single("season_image") , async(req,res) =>{
    try {
        const {season_name,season_description,season_trailer_link,season_genre,season_date,season_image_link}=req.body;
        if(!season_name || !season_description || !season_trailer_link ){
            return res.status(400).json({error:"all fields are required"})
        }
        const season_image = req.file ? req.file.filename : season_image_link || null;


            const result = await pool.query(
      `INSERT INTO series (season_name, season_description , season_trailer_link,season_genre,season_date,season_image_link)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [season_name, season_description , season_trailer_link,season_genre,season_date,season_image_link]
    );
        
            res.json(result.rows[0]);
        } catch (err) {
            console.error("Error uploading category:", err);
            res.status(500).json({ error: "Failed to upload category" });
        }
})

export default Seasons;