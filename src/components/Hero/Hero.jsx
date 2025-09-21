import React, { useRef, useState, useEffect } from "react";
import overlayimg from "../../assets/images/overlay.png";
import "./Hero.css";
import { Link } from "react-router-dom";
export function overlaysub() {
  return (
    <div className="overlay-subscription w-full absolute top-0 left-0 ">
      <img
        src={overlayimg}
        alt="Provider Logo"
        className="w-28 h-44 md:w-43 md:h-65 object-cover rounded-[7px]"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-60 rounded-xl flex flex-col items-center justify-center text-white p-4 gap-3 text-center">
        <h2 className="text-base md:text-xl font-bold">Access Restricted</h2>
        <p className="text-xs md:text-sm text-center px-2">
          Please log in to continue watching.
        </p>
        <div className="flex gap-4">
          <Link to={`/account`}>
            <button className="acc-btn bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export function phonenavbar(isAuthenticated) {
  return (
    <div className="navbar-phone block md:hidden fixed bottom-0 w-full bg-black z-50 p-10">
      <ul className="flex justify-evenly text-white text-sm px-4 py-2">
        <Link to={`/`}>
          <li className="flex flex-col items-center">
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </li>
        </Link>

        <Link to="/watchlist">
          <li className="flex flex-col items-center">
            <i className="fa-solid fa-bookmark"></i>
            <span>Watchlist</span>
          </li>
        </Link>
        <Link to={`contactus`}>
          <li className="flex flex-col items-center">
            <i className="fa-solid fa-envelope"></i>
            <span>Contact</span>
          </li>
        </Link>
        {/* <Link to={isAuthenticated ? "/userprofile" : "/account"}>
          <li className="flex flex-col items-center">
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </li>
        </Link> */}
      </ul>
    </div>
  );
}

export function overlay(movie, userId) {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";
  const addToWatchlist = async () => {
    try {
      const res = await fetch(`${API_URL}/api/watchlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, movie_id: movie.movie_id }),
      });

      const data = await res.json();
      if (data.success) {
        // alert("Added to your watchlist!");
      } else {
        alert("Failed to add: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };
  return (
    <div className="overlay absolute bottom-[5px] left-0 w-full space-y-1 text-white text-[12px] md:text-[14px] flex flex-col gap-2 opacity-0">
      {/* Title */}
      <h3 className="font-bold text-[13px] md:text-[18px] w-fit  leading-tight ">
        {movie.movie_name}
      </h3>
      <div className="flex justify-evenly">
        {/* Genre */}
        <p className="genre bg-[#e50914]  rounded-[20px] md:text-xs   w-fit text-center">
          🎬 {movie.movie_genre}
        </p>
        {/* <p className="font-semibold text-[17px]">{new Date(movie.movie_released_date).getFullYear()}</p> */}
      </div>
      {/* Buttons */}
      <div className="flex items-center justify-around">
        {/* Play Button */}
        <div className="relative">
          <Link to={`/player/${movie.movie_id}`}>
            <i className="fa-solid fa-play w-8 h-8 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e50914] text-white text-sm md:text-base"></i>
          </Link>
          <span className="span absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-semibold text-[10px] md:text-[13px]  rounded whitespace-nowrap w-max opacity-0">
            Watch Now
          </span>
        </div>

        {/* Add to My List Button */}
        <div className="relative " onClick={addToWatchlist}>
          <i className="fa-solid fa-plus w-8 h-8 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e50914] text-white text-sm md:text-base"></i>
          <span className="span-plus absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-semibold text-[10px] md:text-[13px]  rounded whitespace-nowrap w-max opacity-0">
            Add to my list
          </span>
        </div>

        {/* Add to My List Button */}
        <div className="relative ">
          <i className="fas fa-info w-8 h-8 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e50914] text-white text-sm md:text-base"></i>
          <span className="span-plus absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-semibold text-[10px] md:text-[13px]  rounded whitespace-nowrap w-max opacity-0">
            Add to my list
          </span>
        </div>
      </div>
    </div>
  );
}
function Hero() {
  const scrollRef = useRef(null);
  const recentRef = useRef(null);
  const popularRef = useRef(null);

  const [loading, setLoading] = useState(true); // Add loading state
  const [izidasobanuye, setIzidasobanuye] = useState([]);
  const [agasobanuye, setAgasobanuye] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const [izidasobanuyeRes, agasobanuyeRes, moviesRes, userRes] =
          await Promise.all([
            fetch(`${API_URL}/api/izidasobanuye`),
            fetch(`${API_URL}/api/agasobanuye`),
            fetch(`${API_URL}/api/movies`),
            fetch(`${API_URL}/api/me`, { credentials: "include" }),
          ]);

        const izidasobanuyeData = await izidasobanuyeRes.json();
        const agasobanuyeData = await agasobanuyeRes.json();
        const moviesData = await moviesRes.json();
        const userData = await userRes.json();

        setIzidasobanuye(izidasobanuyeData);
        setAgasobanuye(agasobanuyeData);
        setMovies(moviesData);

        if (userData?.id) {
          setIsAuthenticated(true);
          setUserId(userData.id);
        } else {
          setIsAuthenticated(false);
          setUserId(null);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
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

  return (
    // abasobanuzii
    <main>
      <div className="alert-watchlist absolute right-0 top-0 hidden">
        <div>
          <h1 className=" text-green-600 text-2xl">Success</h1>
          <p
            className=" text-green-600  bg-amber-50 w-fit"
            style={{ padding: "12px 14px" }}
          >
            <i className="fa-solid fa-circle-check"></i> This item is now in
            your watchlist
          </p>
        </div>
      </div>
      <div>{phonenavbar()}</div>
      <section>
        {/* Render content after loading */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Interpreter</h1>
            <div className="flex gap-4">
              <i className="fa-solid fa-arrow-left"></i>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <br />

          <div className="interpreter-container flex gap-4 overflow-x-scroll p-4 scrollbar-hidden flex-nowrap">
            {agasobanuye.map((interpreter) => (
              <Link
                to={`/moviesites/${interpreter.category_id}`}
                className="site-link"
                key={interpreter.category_id}
              >
                <div className="interpreter-card flex-shrink-0 w-[150px]">
                  <img
                    src={`${API_URL}/uploads/${interpreter.category_image}`}
                    alt={interpreter.category_name}
                    className="rounded-full w-35 h-35 object-cover"
                  />
                  <h3 className="text-center font-medium">
                    {interpreter.category_name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <br />

        {/* Movie providers */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Movie providers</h1>
            <div className="flex gap-4">
              <i className="fa-solid fa-arrow-left"></i>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <br />

          <div className="interpreter-container flex gap-4 overflow-x-scroll p-4 scrollbar-hidden flex-nowrap">
            {izidasobanuye.map((site) => (
              <Link
                to={`/moviesites/${site.category_id}`}
                className="site-link"
                key={site.category_id}
              >
                <div className="provider-card flex-shrink-0 text-center w-[100px]">
                  <img
                    src={`${API_URL}/uploads/${site.category_image}`}
                    alt={site.category_name}
                    className="w-24 h-24 object-cover"
                  />
                  <h3 className="text-center font-medium">
                    {site.category_name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* most recents */}
        <div className="hidden">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Most recent</h1>
            <div className="flex gap-4">
              <i
                className="fa-solid fa-arrow-left"
                onClick={() => scroll(recentRef, "left")}
              />
              <i
                className="fa-solid fa-arrow-right"
                onClick={() => scroll(recentRef, "right")}
              />
            </div>
          </div>
          <br />

          {/* <div className="flex gap-4 overflow-x-scroll p-4 scrollbar-hidden scroll-smooth ">
            {Movies.map((provider) =>
              provider.movieslist
                .slice(0, 1) // ✅ fix here
                .map((movie) => (
                  <div
                    key={movie.movieid}
                    className="movie-card flex flex-col items-center flex-shrink-0  relative"
                  >
                    <div className="relative ">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="movie-poster w-28 h-44 md:w-43 md:h-65 object-cover rounded-[8px] "
                      />
                      <img
                        src={provider.movieproviderlogo}
                        className="w-[18px] absolute bottom-4 right-2.5"
                      />
                    </div>
                    <div></div>
                    <div>{isAuthenticated ? overlay(movie) : overlaysub()}</div>
                  </div>
                ))
            )}
          </div> */}
        </div>
        <br />
        <br />
        <div className="p-4">
          {/** Get all unique genres from all movies */}
          {[...new Set(movies.map((movie) => movie.movie_genre))].map(
            (genre, idx) => (
              <div key={idx} className="mb-8">
                {/* Genre Title */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold mb-4 capitalize">{genre}</h2>
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

                {/* Scrollable Movies List */}
                <div className="flex gap-4 overflow-x-scroll p-4 scrollbar-hidden scroll-smooth">
                  {movies
                    .filter((movie) => movie.movie_genre === genre)
                    .map((movie) => (
                      <div
                        key={movie.movie_id}
                        className="movie-card flex flex-col items-center flex-shrink-0 relative"
                      >
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
                          />

                          {/* <img
                  src={
                movie.movie_image
                  ? `${API_URL}/uploads/${movie.movie_image}`
                  : `${API_URL}/${movie.movie_image}`
}

                  alt={movie.movie_name}
                  className="movie-poster w-28 h-44 md:w-43 md:h-65 object-cover rounded-[8px]"
                /> */}
                          {/* <h1>{movie.movie_name}</h1> */}
                          {/* If you have a provider logo, you can include it here */}
                          {/* <img src={provider.movieproviderlogo} className="w-[18px] absolute bottom-4 right-2.5" /> */}
                        </div>

                        <div>
                          {isAuthenticated
                            ? overlay(movie, userId)
                            : overlaysub()}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default Hero;
