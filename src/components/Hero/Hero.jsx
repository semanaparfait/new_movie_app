import React, { useRef, useState, useEffect } from "react";
import overlayimg from "../../assets/images/overlay.png";
import "./Hero.css";
import { Link } from "react-router-dom";
import Inyarwanda from "../Inyarwanda/Inyarwanda";
import './SkeletonHero.css'
import { cachedFetch } from "../../utils/cache";
import Movieland from '../../../public/logoo2.jpg'

export function overlaysub() {
  return (
    <div className="overlay-subscription w-full absolute top-0 left-0 ">
      <img
        src={overlayimg}
        alt="Provider Logo"
        className="w-28 h-44 md:w-43 md:h-65 object-cover rounded-[7px]"
        loading="lazy"
        decoding="async"
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
        
        <Link to="/tvshows">
          <li className="flex flex-col items-center">
            <i className="fa-solid fa-tv"></i>
            <span>Tv show</span>
          </li>
        </Link>
        
        <Link to="/livestreaming">
          <li className="flex flex-col items-center">
            <i className="fa-solid fa-tower-broadcast"></i>
            <span>Live</span>
          </li>
        </Link>
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
      if (!data.success) {
        alert("Failed to add: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };
  
  return (
    <div className="overlay absolute bottom-[5px] left-0 w-full space-y-1 text-white text-[12px] md:text-[14px] flex flex-col gap-2 opacity-0">
      <h3 className="font-bold text-[13px] md:text-[18px] w-fit  leading-tight ">
        {movie.movie_name} 
      </h3>
      <div className="flex justify-evenly">
        <p className="genre bg-[#e50914]  rounded-[20px] md:text-xs   w-fit text-center">
          🎬 {movie.movie_genre} 
        </p>
      </div>
      <div className="flex items-center justify-around">
        <div className="relative">
          <Link to={`/player/${movie.movie_id}`}>
            <i className="fa-solid fa-play w-8 h-8 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e50914] text-white text-sm md:text-base"></i>
          </Link>
          <span className="span absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-semibold text-[10px] md:text-[13px]  rounded whitespace-nowrap w-max opacity-0">
            Watch Now
          </span>
        </div>

        <div className="relative " onClick={addToWatchlist}>
          <i className="fa-solid fa-plus w-8 h-8 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e50914] text-white text-sm md:text-base"></i>
          <span className="span-plus absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-semibold text-[10px] md:text-[13px]  rounded whitespace-nowrap w-max opacity-0">
            Add to my list
          </span>
        </div>

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

export function overlaymostrecent(mostrecent, userId) {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";
      
  const addToWatchlist = async () => {
    try {
      const res = await fetch(`${API_URL}/api/watchlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, movie_id: mostrecent.movie_id }),
      });

      const data = await res.json();
      if (!data.success) {
        alert("Failed to add: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };
  
  return (
    <div className="overlay absolute bottom-[5px] left-0 w-full space-y-1 text-white text-[12px] md:text-[14px] flex flex-col gap-2 opacity-0">
      <h3 className="font-bold text-[13px] md:text-[18px] w-fit  leading-tight ">
        {mostrecent.movie_name} 
      </h3>
      <div className="flex justify-evenly">
        <p className="genre bg-[#e50914]  rounded-[20px] md:text-xs   w-fit text-center">
          🎬 {mostrecent.movie_genre} 
        </p>
      </div>
      <div className="flex items-center justify-around">
        <div className="relative">
          <Link to={`/player/${mostrecent.movie_id}`}>
            <i className="fa-solid fa-play w-8 h-8 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e50914] text-white text-sm md:text-base"></i>
          </Link>
          <span className="span absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-semibold text-[10px] md:text-[13px]  rounded whitespace-nowrap w-max opacity-0">
            Watch Now
          </span>
        </div>

        <div className="relative " onClick={addToWatchlist}>
          <i className="fa-solid fa-plus w-8 h-8 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e50914] text-white text-sm md:text-base"></i>
          <span className="span-plus absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-semibold text-[10px] md:text-[13px]  rounded whitespace-nowrap w-max opacity-0">
            Add to my list
          </span>
        </div>

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

export function episodeoverlay(season, userId) {
  return (
    <div className="overlay absolute bottom-[5px] left-0 w-full space-y-1 text-white text-[12px] md:text-[14px] flex flex-col gap-2 opacity-0">
      <h3 className="font-bold text-[13px] md:text-[18px] w-fit  leading-tight ">
        {season.serie_name}
      </h3>
      <div className="flex justify-evenly">
        <p className="genre bg-[#e50914]  rounded-[20px] md:text-xs   w-fit text-center">
          🎬 {season.serie_genre}
        </p>
      </div>
      <div className="flex items-center justify-around">
        <div className="relative">
          <Link to={`/seasons/${season.serie_id}`}>
            <i className="fa-solid fa-play w-8 h-8 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e50914] text-white text-sm md:text-base"></i>
          </Link>
          <span className="span absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-semibold text-[10px] md:text-[13px]  rounded whitespace-nowrap w-max opacity-0">
            Watch Now
          </span>
        </div>

        <div className="relative cursor-not-allowed">
          <i className="fa-solid fa-plus cursor-not-allowed w-8 h-8 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center  hover:bg-[#e50914] text-white text-sm md:text-base"></i>
          <span className="span-plus absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-semibold text-[10px] md:text-[13px]  rounded whitespace-nowrap w-max opacity-0">
            Add to my list
          </span>
        </div>

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

function SkeletonCardhero() {
  return (
    <div>
      <div className="movie-container-watchlist flex flex-col items-center ">
        <div className="skeleton skeleton-text mt-2"></div><br />
        <div className="skeleton skeleton-poster-abasobanuzi rounded-full"></div>
      </div><br />
      <div className="movie-container-watchlist flex flex-col items-center">
        <div className="skeleton skeleton-text mt-2"></div><br />
        <div className="skeleton skeleton-poster-providers"></div>
      </div>
      <div className="movie-container-watchlist flex flex-col items-center">
        <div className="skeleton skeleton-text mt-2"></div><br />
        <div className="skeleton skeleton-poster-movies"></div>
      </div>
    </div>
  );
}

function Hero() {
  const scrollRef = useRef(null);
  const recentRef = useRef(null);
  const popularRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [izidasobanuye, setIzidasobanuye] = useState([]);
  const [agasobanuye, setAgasobanuye] = useState([]);
  const [movies, setMovies] = useState([]); // Always initialize as empty array
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  useEffect(() => {
    // OPTIMIZATION: Load critical content first, then movies in background
    const fetchCriticalData = async () => {
      setLoading(true);
      try {
        // Step 1: Fetch categories FIRST (fastest data) using cache
        const [izidasobanuyeData, agasobanuyeData, userData] = await Promise.all([
          cachedFetch(`${API_URL}/api/izidasobanuye`),
          cachedFetch(`${API_URL}/api/agasobanuye`),
          cachedFetch(`${API_URL}/api/me`).catch(() => null),
        ]);

        setIzidasobanuye(izidasobanuyeData);
        setAgasobanuye(agasobanuyeData);

        if (userData?.id) {
          setIsAuthenticated(true);
          setUserId(userData.id);
        }

        setLoading(false); // Show UI immediately with categories
      } catch (err) {
        console.error("Error fetching critical data:", err);
        setLoading(false);
      }
    };

    // Step 2: Load movies and other data in background
    const fetchMoviesData = async () => {
      try {
        // console.log('🎬 Fetching movies...');
        // OPTIMIZATION: Only fetch first page of movies (50 items)
        const moviesData = await cachedFetch(`${API_URL}/api/movies?page=1&limit=50`);
        // console.log('📦 Movies data received:', moviesData);
        
        // Handle both new pagination response and old array response
        if (moviesData.movies && Array.isArray(moviesData.movies)) {
          // console.log('✅ Using paginated response, movies count:', moviesData.movies.length);
          setMovies(moviesData.movies);
        } else if (Array.isArray(moviesData)) {
          // console.log('✅ Using array response, movies count:', moviesData.length);
          setMovies(moviesData);
        } else {
          console.error('❌ Unexpected movies data format:', moviesData);
          setMovies([]);
        }
        
        setLoadingMovies(false);
      } catch (err) {
        console.error("❌ Error fetching movies:", err);
        setMovies([]); // Set empty array on error
        setLoadingMovies(false);
      }
    };

    // Step 3: Load seasons/episodes last (least critical)
    const fetchSeasonData = async () => {
      try {
        const [episodesData, seasonsData] = await Promise.all([
          cachedFetch(`${API_URL}/api/episodes`),
          cachedFetch(`${API_URL}/api/seasons`),
        ]);
        setEpisodes(episodesData);
        setSeasons(seasonsData);
      } catch (err) {
        console.error("Error fetching season data:", err);
      }
    };

    // Execute in sequence: critical → movies → seasons
    fetchCriticalData().then(() => {
      fetchMoviesData();
      fetchSeasonData();
    });
  }, []);

  if (loading) {
    return (
      <div>
        <div
          className="p-4 grid grid-cols-2 md:grid-cols-6 gap-2"
          style={{ padding: "20px 30px" }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonCardhero key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
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
        <div>
          <div className="flex items-center justify-between">
            <header className="font-bold text-2xl">Interpreter</header>
            <div className="hidden md:flex gap-4">
              <i className="fa-solid fa-arrow-left hero-icons"></i>
              <i className="fa-solid fa-arrow-right hero-icons"></i>
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
                  src={
                    interpreter.category_image
                      ? interpreter.category_image.startsWith("http")
                        ? interpreter.category_image
                        : `${API_URL}/uploads/${interpreter.category_image}`
                      : Movieland
                  }
                    alt={interpreter.category_name}
                    className="rounded-full w-35 h-35 object-cover"
                    loading="lazy"
                    decoding="async"
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

        <div>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Movie providers</h1>
            <div className="hidden md:flex gap-4">
              <i className="fa-solid fa-arrow-left hero-icons"></i>
              <i className="fa-solid fa-arrow-right hero-icons"></i>
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
                    src={
                      site.category_image?.startsWith("http")
                        ? site.category_image
                        : `${API_URL}/uploads/${site.category_image}`
                        
                    }
                    alt={site.category_name}
                    className="w-24 h-24 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="text-center font-medium">
                    {site.category_name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <br />

        <div>
          <Inyarwanda />
        </div>
        <br />

        {loadingMovies ? (
          <div className="text-center text-white">Loading movies...</div>
        ) : (
          <>
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold mb-4">Most recent</h2>
                <div className="hidden md:flex gap-4">
                  <i className="fa-solid fa-arrow-left hero-icons"></i>
                  <i className="fa-solid fa-arrow-right hero-icons"></i>
                </div>
              </div>
              <br />
              <div className="flex gap-4 overflow-x-scroll p-4 scrollbar-hidden scroll-smooth">
                {Array.isArray(movies) && movies.length > 0 ? (
                  movies
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 10)
                    .map((mostrecent) => (
                    <div
                      key={mostrecent.movie_id}
                      className="movie-card flex flex-col items-center flex-shrink-0 relative"
                    >
                      <div className="relative">
                        <Link to={`/player/${mostrecent.movie_id}`}>
                          <img
                            src={
                              mostrecent.movie_image
                                ? mostrecent.movie_image.startsWith("http")
                                  ? mostrecent.movie_image
                                  : `${API_URL}/uploads/${mostrecent.movie_image}`
                                : "https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg"
                            }
                            alt={mostrecent.movie_name}
                            className="movie-poster w-28 h-44 md:w-43 md:h-65 object-cover rounded-[8px]"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg";
                            }}
                            loading="lazy"
                            decoding="async"
                          />
                        </Link>
                      </div>
                      {overlaymostrecent(mostrecent, userId)}
                    </div>
                  ))
                ) : (
                  <div className="text-white">No recent movies available</div>
                )}
              </div>
            </div>
            <br />

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold mb-4">Seasons</h2>
                <div className="hidden md:flex gap-4">
                  <i className="fa-solid fa-arrow-left hero-icons"></i>
                  <i className="fa-solid fa-arrow-right hero-icons"></i>
                </div>
              </div>
              <br />
              <div className="flex gap-4 overflow-x-scroll p-4 scrollbar-hidden scroll-smooth">
                {seasons.map((season) => (
                  <div
                    key={season.serie_id}
                    className="movie-card flex flex-col items-center flex-shrink-0 relative"
                  >
                    <div className="relative">
                      <Link to={`/seasons/${season.serie_id}`}>
                        <img
                          src={
                            season.serie_image
                              ? season.serie_image.startsWith("http")
                                ? season.serie_image
                                : `${API_URL}/uploads/${season.serie_image}`
                              : "https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg"
                          }
                          alt={season.serie_name}
                          className="movie-poster w-28 h-44 md:w-43 md:h-65 object-cover rounded-[8px]"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg";
                          }}
                          loading="lazy"
                          decoding="async"
                        />
                      </Link>
                    </div>
                    {episodeoverlay(season, userId)}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4">
              {Array.isArray(movies) && movies.length > 0 ? (
                [
                  ...new Set(
                    movies.map((movie) => movie.movie_genre.trim().toLowerCase())
                  ),
                ].map((genre, idx) => (
                <div key={idx} className="mb-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold mb-4">{genre}</h2>
                    <div className="hidden md:flex gap-4">
                      <i className="fa-solid fa-arrow-left hero-icons"></i>
                      <i className="fa-solid fa-arrow-right hero-icons"></i>
                    </div>
                  </div>
                  <br />

                  <div className="flex gap-4 overflow-x-scroll p-4 scrollbar-hidden scroll-smooth">
                    {movies
                      .filter(
                        (movie) =>
                          movie.movie_genre.trim().toLowerCase() === genre
                      )
                      .map((movie) => (
                        <div
                          key={movie.movie_id}
                          className="movie-card flex flex-col items-center flex-shrink-0 relative"
                        >
                          <div className="relative">
                            <Link to={`/player/${movie.movie_id}`}>
                              <img
                                src={
                                  movie.movie_image
                                    ? movie.movie_image.startsWith("http")
                                      ? movie.movie_image
                                      : `${API_URL}/uploads/${movie.movie_image}`
                                    : Movieland
                                }
                                alt={movie.movie_name}
                                className="movie-poster w-28 h-44 md:w-43 md:h-65 object-cover rounded-[8px]"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    Movieland;
                                }}
                                loading="lazy"
                                decoding="async"
                              />
                            </Link>
                          </div>
                          {overlay(movie, userId)}
                        </div>
                      ))}  
                  </div>
                </div>
              ))
              ) : (
                <div className="text-white text-center">No movies available by genre</div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Hero;
