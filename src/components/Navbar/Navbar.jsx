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
      <nav className='flex justify-between items-center w-full mx-auto pt-11'>
        {/* Logo */}
        <div>
          <img src={homelogo} alt="home logo" className='w-[2.5rem]' />
        </div>

        {/* Navigation Links */}
        <div className="hidden sm:block">
          <ul className="flex gap-8">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/watchlist">watchlist</Link></li>
            <li><Link to="/contactus">Contact us</Link></li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="search-bar relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search movies..."
            className="search-input px-3 py-1 rounded-md border border-gray-300 w-64"
          />
          <i className="fa fa-search absolute right-2 top-1/2 -translate-y-1/2"></i>

          {/* 🔎 Search Results Dropdown */}
          {results.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
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
                  {movie.movie_name}
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
            <div className="relative dropdown flex gap-3 text-right">
              <img src={profile} alt="profile" className="w-8 h-8 rounded-full cursor-pointer" />
              <span className="ml-2">{user?.username}</span>
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
