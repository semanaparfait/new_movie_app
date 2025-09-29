import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Watchlist.css";
import Navbar from "../../components/Navbar/Navbar";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  // Fetch the logged-in user's ID
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/me`, { method:"GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.id) {
          setUserId(data.id);
        }
      })
      .catch((err) => console.error("Failed to fetch user info:", err));
  }, []);

  // Fetch the watchlist
  useEffect(() => {
    if (!userId) return;

    fetch(`${API_URL}/api/watchlist/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setWatchlist(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch watchlist:", err);
        setLoading(false);
      });
  }, [userId]);

  // Remove movie from watchlist
  const removeFromWatchlist = async (movie_id) => {
    try {
      const res = await fetch(`${API_URL}/api/watchlist`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, movie_id }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setWatchlist(watchlist.filter((movie) => movie.movie_id !== movie_id));
      } else {
        alert("Failed to remove: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p className="p-4">Loading your watchlist...</p>;

  if (watchlist.length === 0) return <img src="https://i.pinimg.com/736x/44/c4/e4/44c4e483771d88fbbca4caf5f09bc46e.jpg" alt="watch list id empy" className="w-full h-full" />;

  return (
    <div><br />
    <Navbar />
      <h1 className="text-center text-[27px]">Your Favorites → Watchlist</h1>
    <div className="p-4 grid grid-cols-2 md:grid-cols-6 gap-2" style={{padding:"20px 30px"}}>
      {watchlist.map((movie) => (
      <div key={movie.movie_id} className="movie-container-watchlist relative flex flex-col items-center">
        <img
          src={
            movie.movie_image
              ? movie.movie_image.startsWith('http')
                ? movie.movie_image
                : `${API_URL}/uploads/${movie.movie_image}`
              : "https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg"
          }
          alt={movie.movie_name}
          className="movie-poster w-28 h-44 md:w-43 md:h-65 object-cover rounded-[8px]"
        />
        <p>{movie.movie_name}</p>

        <div className="watchlist-buttons">
          <Link to={`/player/${movie.movie_id}`}>
            <button className="playBtn-watchlist absolute top-1/2 left-1/2 -translate-x-[80%] -translate-y-10 md:-translate-y-1/2">
              <i className="fa-solid fa-play play-watchlist text-[40px] md:text-[60px]"></i>
            </button>
          </Link>

      <button 
      className='downloadBtn-watchlist absolute top-2 right-8' 
      onClick={() => removeFromWatchlist(movie.movie_id)} >
         <i className="fa-solid fa-circle-xmark text-[23px]"></i> 
         </button>
        </div>
      </div>

      ))}
    </div>
    </div>
  );
}

export default Watchlist;
