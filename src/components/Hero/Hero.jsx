import React, { useRef } from "react";
import Movies from "../../Data/Movies.js";
import overlayimg from "../../assets/images/overlay.png"
import "./Hero.css";
import { Link } from "react-router-dom";
  export function overlaysub() {
    return(
        <div className="overlay-subscription w-full absolute top-0 left-0 ">
          <img
            src={overlayimg}
            alt="Provider Logo"
            className="w-28 h-44 md:w-43 md:h-65 object-cover rounded-[7px]"
          />

          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-60 rounded-xl flex flex-col items-center justify-center text-white p-4 gap-3 text-center">
            <h2 className="text-base md:text-xl font-bold">
              Access Restricted
            </h2>
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
  export function phonenavbar(){
    return(
        //  {/* // nav for phones */}
      <div className="navbar-phone block md:hidden fixed bottom-0 w-full bg-black z-50 p-10">
        <ul className="flex justify-evenly text-white text-sm px-4 py-2">
          <Link to={`/`}>
            <li className="flex flex-col items-center">
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </li>
          </Link>
          <Link>
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
          <Link to={isLoggedin ? "/userprofile" : "/account"}>
            <li className="flex flex-col items-center">
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </li>
          </Link>
        </ul>
      </div>
    );
  }
  export const isLoggedin = true
function Hero() {

  function overlay(movie) {
    return (
       <div className="overlay absolute bottom-[5px] left-0 w-full space-y-1 text-white text-[12px] md:text-[14px] flex flex-col gap-2 opacity-0">
                {/* Title */}
                <h3 className="font-bold text-[13px] md:text-[18px] w-fit  leading-tight ">
                  {movie.title}
                </h3>
                <div className="flex justify-evenly">
                {/* Genre */}
                <p className="genre bg-[#e50914] px-2 py-[2px] rounded-[20px] text-[10px] md:text-xs mb-1 md:mb-2 w-fit">
                  🎬 {movie.genre}
                </p>
                <p>{movie.year}</p>

                </div>


                {/* Buttons */}
                <div className="flex items-center justify-around">
                  {/* Play Button */}
                  <div className="relative">
                    <Link to={`/player/${movie.movieid}`}>
                    <i className="fa-solid fa-play w-8 h-8 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e50914] text-white text-sm md:text-base"></i>
                    </Link>
                    <span className="span absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-semibold text-[10px] md:text-[13px]  rounded whitespace-nowrap w-max opacity-0">
                      Watch Now
                    </span>
                  </div>

                  {/* Add to My List Button */}
                  <div className="relative ">
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

    const scrollRef = useRef(null);
    const recentRef = useRef(null);
    const popularRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    // abasobanuzii
    <main>

  
   
      <div>{phonenavbar()}</div>
    <section>

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
          {Movies.filter(
            (interpreter) => interpreter.providertype === "interpreter"
          ) // example: exclude 'junior'
            .map((interpreter) => (
              <Link
                to={`/interpreterpage/${interpreter.movieproviderid}`}
                className="interpreter-link"
                key={interpreter.movieproviderid}
              >
                <div className="interpreter-card flex-shrink-0 w-[150px] ">
                  <img
                    src={interpreter.movieproviderlogo}
                    alt={interpreter.name}
                    className="rounded-full w-35 h-35 object-cover"
                  />
                  <h3 className="text-center font-medium ">
                    {interpreter.movieprovidername}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <br />

      {/* // movie app providers */}
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
{Movies.filter((provider) => provider.providertype === "sites").map(
  (provider) => (
    <Link
      to={`/moviesites/${provider.movieproviderid}`}
      className="site-link"
      key={provider.movieproviderid} // ✅ keep only here
    >
      <div className="provider-card flex-shrink-0 text-center w-[100px]">
        <img
          src={provider.movieproviderlogo}
          alt={provider.name}
          className=" w-24 h-24 object-cover"
        />
        <h3 className="text-center font-medium ">
          {provider.movieprovidername}
        </h3>
      </div>
    </Link>
  )
)}

        </div>
      </div>
      {/* most recents */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">Most recent</h1>
          <div className="flex gap-4">
              <i className="fa-solid fa-arrow-left" onClick={() => scroll(recentRef, 'left')} />
              <i className="fa-solid fa-arrow-right" onClick={() => scroll(recentRef, 'right')} />
          </div>
        </div>
        <br />
      
          <div className="flex gap-4 overflow-x-scroll p-4 scrollbar-hidden scroll-smooth " >
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
                    <div> 
                    </div>
                     <div>{ isLoggedin ? overlay(movie) : overlaysub()}</div>
                  </div>
                ))
            )}
          </div>
   
      </div>
      <br />
      {/* most popular */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">Most Popular</h1>
          <div className="flex gap-4">
                <i className="fa-solid fa-arrow-left" onClick={() => scroll(popularRef, 'left')} />
                <i className="fa-solid fa-arrow-right" onClick={() => scroll(popularRef, 'right')} />
          </div>
        </div>
        <br />
        <div className="flex gap-4 overflow-x-scroll p-4 scrollbar-hidden scroll-smooth " ref={popularRef}>
          {Movies.map((provider) =>
            provider.movieslist
              .filter((movie) => movie.popularity >= "1,000,000")
              .map((movie) => (
                <div
                  key={movie.movieid}
                  className="movie-card flex flex-col items-center flex-shrink-0 relative"
                >
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="movie-poster w-[280px] h-[180px] object-cover rounded-xl "
                    />
                    <img
                      src={provider.movieproviderlogo}
                      className="w-[18px] absolute bottom-4 right-2.5"
                    />
                  </div>
                  {/* <div>{overlaysub()}</div> */}
                  <div>{isLoggedin ? overlay(movie) : overlaysub()}</div>
  
    
                </div>
              ))
          )}
        </div>
      </div>
      <br />
      <div className="p-4">
        {/** Step 1: Get all unique genres from all movies */}
        {[
          ...new Set(
            Movies.flatMap((provider) =>
              provider.movieslist.map((movie) => movie.genre)
            )
          ),
        ].map((genre, idx) => (
          <div key={idx} className="mb-8">
            {/* Genre Title */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-4 capitalize">{genre}</h2>
              <div className="flex gap-4">
            <i className="fa-solid fa-arrow-left"
            onClick={() => scroll('left')}
            ></i>
            <i className="fa-solid fa-arrow-right"
            onClick={() => scroll('right')}></i>
              </div>
            </div>
            <br />

            {/* Scrollable Movies List */}
              <div className="flex gap-4 overflow-x-scroll p-4 scrollbar-hidden scroll-smooth " >
              {Movies.flatMap((provider) =>
                provider.movieslist
                  .filter((movie) => movie.genre === genre)
                  .map((movie) => (
                    <div
                      key={movie.movieid}
                      className="movie-card flex flex-col items-center flex-shrink-0  relative"
                    >
                      <div className="relative">
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
                      
                      <div>{ isLoggedin ? overlay(movie) : overlaysub()}</div>
                    </div>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
      </main>
  );
}

export default Hero;
