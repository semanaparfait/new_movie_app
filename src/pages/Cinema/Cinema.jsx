import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

function Cinema() {
  const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://new-movie-app.onrender.com";

  const { movieid } = useParams();
  const [movie, setMovie] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/api/movies/${movieid}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error(err));
  }, [movieid]);

  useEffect(() => {
    if (movie && videoRef.current) {
      videoRef.current.play().catch(err => console.log(err));
    }
  }, [movie]);

  if (!movie) return <div>Loading...</div>;

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-black w-full h-screen">
  <h1 className="text-white text-2xl mb-4">{movie.movie_name}</h1>
  <video
    ref={videoRef}
    controls
    autoPlay
    className="w-full h-[80%] object-contain mb-6 rounded-lg shadow-lg"
    src={movie.movie_video_link}
  >
    Your browser does not support the video tag.
  </video>
</div>

  );
}

export default Cinema;
