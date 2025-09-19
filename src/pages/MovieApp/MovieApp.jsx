import React, { useState, useEffect } from "react";
import "./MovieApp.css";
import mostlogo from "../../assets/images/updatedlogo.png";
import Footer from "../../components/Footer/Footer";
import { useParams, Link } from "react-router-dom";
import { overlaysub, phonenavbar, overlay } from "../../components/Hero/Hero.jsx";

function MovieApp() {
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
    fetch(`${API_URL}/api/me`, { credentials: "include" })
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

  if (loading) return <div>Loading movies...</div>;

  // Filter movies based on clicked category
  const filteredMovies = movies.filter(
    (movie) => Number(movie.category_id) === Number(siteid)
  );

  if (!filteredMovies.length)
    return <div>No movies found for this category</div>;

  // Get unique genres from filtered movies
  const genres = [...new Set(filteredMovies.map((movie) => movie.movie_genre))];

  // Get category name for display
  const categoryName = filteredMovies[0]?.category_name || `Category ${siteid}`;



  return (
    <main>
      <div>{phonenavbar()}</div>

      <div
        className="movie-site-holder"
        // style={{ background: interpreter.sitebackground }}
      >
        <nav className="flex items-center justify-between w-full px-4 py-2">
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
        <br />
        <br />

        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className=" text-white p-4  flex flex-col justify-center w-full md:w-1/2 ">
            <h2 className="text-2xl font-bold mb-2">Watch on {categoryName}</h2>
            <br />
            <h3 className="text-base">
              Enjoy trending movies, top series, and exclusive shows—all in one
              place. Start your {categoryName} journey today!
            </h3>
          </div>

          <div className="p-4 w-full md:w-1/2  flex justify-end">
            {/* <img src={interpreter.logodescription} alt="logo" className="w-[14rem]" /> */}
          </div>
        </div>

        <div>
          {genres.map((genre) => (
            <div key={genre}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold mb-2 text-white capitalize">
                  {genre} Movies
                </h2>
                <div className="flex gap-4">
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
                  .filter((movie) => movie.movie_genre === genre)
                  .map((movie) => (
                    <div className="movie-card flex flex-col items-center flex-shrink-0 relative">
                      {/* <Link to={`/player/${movie.movieid}`} key={movie.movieid}> */}
                      <div className="relative">
                        <img
                          src={movie.movie_image}
                          alt={movie.movie_name}
                          className="movie-poster w-28 h-44 md:w-43 md:h-65 object-cover rounded-xl "
                        />
                      </div>
                      {/* </Link> */}
                       <div>
                        {isAuthenticated ? overlay(movie) : overlaysub()}
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
