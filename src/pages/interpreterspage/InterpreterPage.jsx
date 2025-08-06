import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import interpreters from '../../Data/Interpreters.js';
import mostlogo from "../../assets/images/updatedlogo.png"
import Movies from '../../Data/Movies.js';
import './InterpreterPage.css';
import Footer from '../../components/Footer/Footer'
import { overlaysub, phonenavbar } from '../../components/Hero/Hero.jsx';

function InterpreterPage() {
  
  const { id } = useParams();
  const interpreter = Movies.find(i => i.movieproviderid === id);

  if (!interpreter) return <div>Interpreter not found</div>;

  const [currentIndex, setCurrentIndex] = useState(0);
  const movies = interpreter.movieslist.slice(0, 3); // limit to 3 movies

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const movie = movies[currentIndex]; // current movie for background
    const genres = [...new Set(interpreter.movieslist.map(movie => movie.genre))];

  return (
    <main>
      <div>{phonenavbar()}</div>
    <div>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between  w-full px-4 absolute z-10">
        <div className="logo">
          <img src={mostlogo} alt="logo" className='w-[10rem]' />
          {/* <h1 className="text-xl font-bold text-gray-800">{interpreter.movieprovidername}</h1> */}
        </div>
        <ul className='items-center gap-4 hidden sm:flex'>
          <li>Home</li>
          <li>Watctlist</li>
        </ul>
        
             <div className="search-bar search-inter flex-end ">
                <input type="text"
                // value={query}
                // onChange={handleSearch}
                   placeholder={`Search movies from ${interpreter.movieprovidername}`}
                 
                   />
                <a href="#"><i className="fa fa-search"></i></a>
            </div>
      </nav>
      <div>{}</div>

      {/* Background Section with Auto-Switching */}
      <div className="recent-header-container">
        <div className="recent-mv-description">
          <div
            key={movie.movieid}
            className="recent-movie-card flex flex-wrap justify-between items-center p-6 relative"
            style={{
              backgroundImage: `url(${movie.poster})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh'
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            {/* Movie Info */}
            <div className="recent-movie-info z-10 ">
              <p className="text-sm uppercase text-[#ffc107]">{movie.genre}</p>
              <h1 className="text-5xl tracking-widest uppercase font-extrabold">{movie.title}</h1><br />
              <p className="text-[1.4rem] text-gray-200 w-full sm:w-1/2">{movie.description}</p><br />
              <div className='flex gap-4 text-white mt-4'>
                <div>
                  <h4 className='font-bold'>IMDB RATING</h4>
                  <p><i class="fa-solid fa-star text-[#ffc107]"></i> {movie.rating}</p>
                </div>
                <div>
                  <h4 className='font-bold'>YOUR RATING</h4>
                  <p className='text-[purple]'><i class="fa-solid fa-star "></i> Rate</p>
                </div>
                <div>
                  <h4 className='font-bold'>POPULARITY</h4>
                  <p><i class="fa-solid fa-arrow-trend-up border rounded-full text-[green]"></i> {movie.popularity}</p>
                </div>
              </div><br />
              <div className="buttons flex gap-2 mt-4">
                <button className="explore-btn bg-yellow-400 text-black px-4 py-2 rounded flex items-center gap-2">
                   ▶ Play Now
                </button>
                <button className="more-info-btn bg-white/20 text-white px-4 py-2 rounded flex items-center gap-2">
                  <i className="fa-solid fa-info"></i> More Info
                </button>
              </div>
            </div>

            {/* Movie Poster Thumbnail */}
            {/* <div className="recent-movie-poster z-10 ">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-[200px] h-[300px] object-cover rounded-xl shadow-lg"
              />
            </div> */}
          </div>
        </div>
      </div><br />

      {/* Action Movies Section */}
 <div>
      {genres.map((genre) => (
        <div key={genre}>
          <h2 className="text-lg font-semibold mb-2 text-white capitalize">{genre} Movies</h2><br />
          <div className="flex gap-4 overflow-x-scroll scrollbar-hidden pb-4">
            {interpreter.movieslist
              .filter(movie => movie.genre === genre)
              .map(movie => (
                 <div  className="movie-card flex flex-col items-center flex-shrink-0 relative">
                {/* // <Link to={`/player/${movie.movieid}`}> */}
                <div key={movie.id} className="movie-card flex-shrink-0">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                      className="movie-poster w-28 h-44 md:w-43 md:h-65 object-cover rounded-xl "
                  />

                </div>
                {/* // </Link> */}
                  <div>{overlaysub()}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </div>
      </main>
  );
}

export default InterpreterPage;
