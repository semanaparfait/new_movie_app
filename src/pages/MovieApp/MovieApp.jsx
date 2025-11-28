import React, { useState, useEffect, lazy } from "react";
import "./MovieApp.css";
import mostlogo from "../../assets/images/updatedlogo.png";
import Footer from "../../components/Footer/Footer";
import { useParams, Link } from "react-router-dom";
import { overlaysub, phonenavbar, overlay } from "../../components/Hero/Hero.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import moviesimage from '../../assets/images/movieapp/movies.jpg'
import './Skeleton.css'


function SkeletonCardapp() {
  return (
    <div className="movie-container-watchlist flex flex-col items-center">
      <div className="skeleton skeleton-poster"></div>
      <div className="skeleton skeleton-text mt-2"></div>
    </div>
  );
}
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

  //  if (loading) {
  //   return (
  //     <div className="loading-container flex justify-center items-center h-screen">
  //       <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full">
  //         <span className="visually-hidden">Loadingboi...</span>
  //       </div>
  //     </div>
  //   );
  // }
if (loading) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar/>
            <div className="relative border-b-4 border-[#f25b29]">
          <img
          src={moviesimage}
          alt="movietitle"
          className="w-full h-36 object-cover rounded-md"
          loading='lazy'
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-[2px] rounded-md"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        text-3xl md:text-5xl font-bold text-center text-white
        before:content-[''] before:absolute before:w-6 before:h-6 before:border-t-4 before:border-l-4 before:border-[#f25b29] before:top-0 before:left-0
        after:content-[''] after:absolute after:w-6 after:h-6 after:border-b-4 after:border-r-4 after:border-[#f25b29] after:bottom-0 after:right-0
        px-12 py-4 " style={{padding:'15px 50px'}}>
            Movie Land
        </div>
      </div><br />
      <div className="flex justify-between flex-wrap gap-2.5 border-b border-b-[#f25b29]" style={{paddingBottom:'10px'}}>
        <div>
          <h3 className="font-semibold">All Movies provided by <span className="text-[#f25b29]">Movie Land</span></h3>
          <p>Enjoy trending top movies, top series and exclusive offers</p>
        </div>
        <button className="border rounded-[5px] border-blue-950 cursor-pointer"style={{padding:'4px 10px'}}><i className="fa-solid fa-bell"></i> Subscriibe to <span className="text-[#f25b29]">Movie Land</span></button>
      </div><br />
      <div className="p-6">
        <div className="flex gap-4 flex-wrap">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCardapp key={idx} />
          ))}
        </div>
      </div>
    </main>
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
      <div className="relative border-b-4 border-[#f25b29]">
          <img
          src={moviesimage}
          alt="movietitle"
          className="w-full h-[9rem] object-cover rounded-md"
          loading='lazy'
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-[2px] rounded-md"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        text-3xl md:text-5xl font-bold text-center text-white
        before:content-[''] before:absolute before:w-6 before:h-6 before:border-t-4 before:border-l-4 before:border-[#f25b29] before:top-0 before:left-0
        after:content-[''] after:absolute after:w-6 after:h-6 after:border-b-4 after:border-r-4 after:border-[#f25b29] after:bottom-0 after:right-0
        px-12 py-4 " style={{padding:'15px 50px'}}>
          {categoryName.split(" ").map((word, idx) => (
            <span key={idx} className={idx === 1 ? "text-[#f25b29]" : "text-white"}>
              {word}{" "}
            </span>
          ))}
        </div>
      </div><br />
      <div className="flex justify-between flex-wrap gap-2.5 border-b-1 border-b-[#f25b29]" style={{paddingBottom:'10px'}}>
        <div>
          <h3 className="font-semibold">All Movies provided by <span className="text-[#f25b29]">{categoryName}</span></h3>
          <p>Enjoy trending top movies, top series and exclusive offers</p>
        </div>
        <button className="border rounded-[5px] border-blue-950 cursor-pointer"style={{padding:'4px 10px'}}><i className="fa-solid fa-bell"></i> Subscriibe to <span className="text-[#f25b29]">{categoryName}</span></button>
      </div><br />


        
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
                    <div 
                    key={movie.movie_id}
                    className="movie-card flex flex-col items-center flex-shrink-0 relative">
                      {/* <Link to={`/player/${movie.movieid}`} key={movie.movieid}> */}
                      <div className="relative">
                        <Link to={`/player/${movie.movie_id}`}>
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
                        </Link>
                      </div>
                      {/* </Link> */}
                       <div>
                        {overlay(movie, userId)}
                        {/* {isAuthenticated ? overlay(movie, userId) : overlaysub()} */}
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
