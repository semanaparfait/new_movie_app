import React, { useState, useEffect, lazy } from "react";
import "./MovieApp.css";
import mostlogo from "../../assets/images/updatedlogo.png";
import Footer from "../../components/Footer/Footer";
import { useParams, Link } from "react-router-dom";
import { overlaysub, phonenavbar, overlay } from "../../components/Hero/Hero.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

function MovieApp(u) {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const { siteid } = useParams(); // category_id from URL

  useEffect(() => {
    fetch(`${API_URL}/api/movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/me`, {method:"GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log("User data:", data);
        if (data?.id) {
          setIsAuthenticated(true);
          setUserId(data.id);
        } else {
          setIsAuthenticated(false);
          setUserId(null);
        }
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

   if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Filter movies based on clicked category
  const filteredMovies = movies.filter(
    (movie) => Number(movie.category_id) === Number(siteid)
  );

  if (!filteredMovies.length)
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
                      <Link to="/" >
                  <i className="back-btn fa-solid fa-arrow-left absolute left-[50px] top-[30px] "></i>
                      </Link>

           <div className="bg-white/10 backdrop-blur-md rounded-2xl  border border-white/20 animate-float"style={{padding:"2rem", marginBottom:"2rem"}}>
          <div className="flex justify-center mb-4">
            <i className="fa-solid fa-clock text-green-400 animate-spin-slow text-5xl"></i>
            {/* <Clock size={32} className="text-green-400 animate-spin-slow" /> */}
          </div><br />
          <h3 className="text-2xl font-semibold text-white mb-3">
            Check Back Tomorrow!
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            We're putting the finishing touches on our new website.
            <br />
            Come back tomorrow and we hope it will be available!
          </p>
        </div>
        </div>
    );

  // Get unique genres from filtered movies
  const genres = [...new Set(filteredMovies.map((movie) => movie.movie_genre.trim().toLowerCase()))];

  // Get category name for display
  const categoryName = filteredMovies[0]?.category_name || `Category ${siteid}`;



  return (
    <main>
      <div>{phonenavbar()}</div>

      <div
        className="movie-site-holder"
        // style={{ background: interpreter.sitebackground }}
      >
        <Navbar />
        <nav className="flex items-center justify-between w-full px-4 py-2 hidden">
          <div className="logo">
            <img src={mostlogo} alt="logo" className="w-[10rem]" />
          </div>

          <ul className="items-center gap-4 text-white hidden sm:flex">
            <li>Home</li>
            <li>Watchlist</li>
          </ul>

          <div className="search-bar search-inter flex-end">
            <input type="text" placeholder="Search movies from " />
            <a href="#">
              <i className="fa fa-search"></i>
            </a>
          </div>
        </nav>
        
              <div className="-row w-full gap-4 hidden">
          <div className=" text-white p-4  2 ">
            <h2 className="title-provider text-2xl text-center font-bold mb-2">Provided by {categoryName}</h2>
            <br />
          </div>

          <div className="p-4 w-full md:w-1/2  flex justify-end hidden">
            {/* <img src={interpreter.logodescription} alt="logo" className="w-[14rem]" /> */}
          </div>
        </div>

        <div>
          {genres.map((genre) => (
            <div key={genre}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold mb-2 text-white capitalize">
                  {genre} 
                </h2>
                <div className="hidden md:flex gap-4">
                  <i
                    className="fa-solid fa-arrow-left"
                    onClick={() => scroll("left")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-right"
                    onClick={() => scroll("right")}
                  ></i>
                </div>
              </div>
              <br />
              <div className="flex gap-4 overflow-x-scroll scrollbar-hidden scroll-smooth">
                {filteredMovies
                  .filter((movie) => movie.movie_genre.trim().toLowerCase() === genre)
                  .map((movie) => (
                    <div className="movie-card flex flex-col items-center flex-shrink-0 relative">
                      {/* <Link to={`/player/${movie.movieid}`} key={movie.movieid}> */}
                      <div className="relative">
                          <img
                            src={
                              movie.movie_image
                                ? movie.movie_image.startsWith("http")
                                  ? movie.movie_image // full URL, use as is
                                  : `${API_URL}/uploads/${movie.movie_image}` // uploaded file, prepend API path
                                : "/https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg" // optional fallback if no image
                            }
                            alt={movie.movie_name}
                            className="movie-poster w-28 h-44 md:w-43 md:h-65 object-cover rounded-[8px]"
                            loading="lazy"
                          />
                      </div>
                      {/* </Link> */}
                       <div>
                        {isAuthenticated ? overlay(movie, userId) : overlaysub()}
                          </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <Footer />
      </div>
    </main>
  );
}

export default MovieApp;
