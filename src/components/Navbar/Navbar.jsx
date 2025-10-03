import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homelogo from '../../assets/images/homelogo2.png';
import profile from '../../assets/images/profile.jpg';
import './Navbar.css';

function Navbar() {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState([]);

  // ✅ Check login status
  useEffect(() => {
    fetch(`${API_URL}/api/me`, { 
      method:"GET",
      credentials: "include" 
    })
      .then(res => res.json())
      .then(data => {
        // console.log("User data from /api/me:", data); show user data in console for debugging and testing
        if (data?.id) {
          setIsLoggedin(true);
          setUser(data);
        } else {
          setIsLoggedin(false);
          setUser(null);
        }
      })
      .catch(err => console.error('Error fetching user data:', err));
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    fetch(`${API_URL}/api/logout`, { credentials: "include", method: "POST" })
      .then(() => {
        setIsLoggedin(false);
        setUser(null);
      })
      .catch(err => console.error(err));
  };

  // ✅ Fetch movies
  useEffect(() => {
    fetch(`${API_URL}/api/movies`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Error fetching movies:", err));
  }, []);

  // ✅ Search handler
  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = movies.filter(movie =>
      (movie?.movie_name || "").toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <div className='navbar hidden md:block'>
      <nav className='flex justify-between items-center w-full mx-auto  '>
        {/* Logo */}
        <Link to="/">
        <div>
          <img src={homelogo} alt="home logo" className='w-[2.5rem]' />
        </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden sm:block">
          <ul className="flex gap-8">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tvshows">Tv shows</Link></li>
            <li><Link to="/livestreaming">Live streaming</Link></li>
            <li><Link to="/watchlist">watchlist</Link></li>
            {/* <li><Link to="/contactus">Contact us</Link></li> */}
          </ul>
        </div>

        {/* Search Bar */}
        <div >
        <div className="search-bar relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search movies..."
            className="search-input  rounded-md border border-gray-300 w-64"
          />
          <i className="fa fa-search absolute right-2 top-1/2 -translate-y-1/2"></i>

        </div>
          {/* 🔎 Search Results Dropdown */}
          {results.length > 0 && (
            <div className="absolute w-[90%] md:w-1/3 right-4 md:right-8 bg-white z-500" style={{padding:'5px 10px'}}>
              {results.map((movie) => (
                <Link
                  key={movie.movie_id}
                  to={`/player/${movie.movie_id}`}
                  className="block px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setQuery("");   // clear input
                    setResults([]); // hide dropdown
                  }}
                >
                  <div className='flex gap-1.5'>
                    {/* <img src={movie.movie_image} alt={movie.movie_name}
                    className='w-[3rem] h-[4rem] rounded-[6px] '
                    /> */}
                                  <img
                src={
                  movie.movie_image
                    ? movie.movie_image.startsWith("http")
                      ? movie.movie_image
                      : `${API_URL}/uploads/${movie.movie_image}`
                    : "https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg"
                }
                alt={movie.movie_name}
                className="w-[3rem] h-[4rem] rounded-[6px] object-cover "
                onError={(e) => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = "https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg";
                }}
                loading="lazy"
              />
                    <div>
                      <p className='text-[13px] text-black'>{movie.movie_name}</p>
                      <div className='flex gap-7'>

                      <p className='text-gray-400 text-[13px] font-semibold'>{new Date(movie.created_at).getFullYear()}</p>
                      <p className='text-white bg-red-500 w-fit rounded-[5px] text-[13px]' style={{padding:'2px 5px'}}>{movie.movie_genre}</p>
                      </div>

                    </div>
                  </div><br />
                  
                </Link>
              ))}
            </div>
          )}
     </div>
        {/* Authentication */}
        <div className='flex'>
          {!isLoggedin ? (
            <Link to="/account">
              <div className='flex items-center gap-4'>
                <img 
                  src='https://i.pinimg.com/736x/8c/b3/ec/8cb3ec2bcd6067d551a8604d628416aa.jpg' 
                  alt="profile" 
                  className="w-6 sm:w-8 rounded-full" 
                  
                />
                <button className='border rounded-[10px]' style={{ padding: '5px 10px' }}>Sign in</button>
              </div>
            </Link>
          ) : (
            <div className="relative dropdown flex  text-right">
              <img src={profile} alt="profile" className="w-8 h-8 rounded-full cursor-pointer" />
             <span>{user?.username?.split(' ')[0].slice(0, 6)}</span>

              <div className="dropdown-menu absolute left-0 top-2 mt-2 shadow-lg rounded-md p-2">
                <Link to="/userprofile">
                  <button className="w-full text-left px-2 py-1 hover:bg-gray-100">Profile</button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
