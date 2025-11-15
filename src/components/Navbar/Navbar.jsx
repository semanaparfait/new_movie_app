import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homelogo from '../../assets/images/homelogo2.png';
import profile from '../../assets/images/profile.jpg';
import { useNavigate } from "react-router-dom";
import { CiStreamOn } from "react-icons/ci";

import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [bringinput,setBringinput] = useState(false)
  const [userdetails, setUserdetails] = useState(false)

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

  const highlightText = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-[#FFBADE] text-black  rounded" style={{padding:'2px 1px 2px 1px'}}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

  return (
<header className="  w-full " style={{padding:'20px 10px'}}>
  <nav className="flex justify-between items-center mx-auto  w-full ">

    {/* Logo */}
    <Link to="/" className="flex items-center">
      <img src={homelogo} alt="Home logo" className="w-[2.5rem]" />
    </Link>

    {/* Navigation Links */}
    <ul className="hidden sm:flex items-center gap-8 text-white font-medium">
      <li>
        <Link to="/" className='flex flex-col items-center'>
        <i className="fa-solid fa-house text-[#FFBADE]"></i>
         <p className='nav-links' style={{paddingTop:'6px'}}>Home</p>
         </Link></li>
      <li>
        <Link to="/tvshows" className='flex flex-col items-center'>
        <i className="fa-solid fa-tv text-[#FFBADE]"></i>
         <p className='nav-links' style={{paddingTop:'6px'}}>TV Shows</p>
         </Link>
         </li>
      <li className='text-center' >
        <Link to="/livestreaming" className='flex flex-col items-center'>
        <CiStreamOn  className='font-black text-[22px] text-[#FFBADE]'/> 
        <p className='nav-links' >Live Streaming</p>
        </Link></li>
      <li className='hidden'><Link to="/watchlist">Watchlist</Link></li>
    </ul>

    {/* Search Section */}
    <div className="">
          <button title='search' className='cursor-pointer font-bold' onClick={()=>setBringinput(!bringinput)}>
            <i className="fa fa-search "></i>

          </button>



    </div>

    {/* Authentication */}
    <div className="flex items-center gap-4 relative">
      {!isLoggedin ? (
        <Link to="/account" className="flex items-center gap-2">
          <img
            src="https://i.pinimg.com/736x/8c/b3/ec/8cb3ec2bcd6067d551a8604d628416aa.jpg"
            alt="Guest user"
            className="w-8 h-8 rounded-full hidden"
          />
             <button className='border rounded-[10px]' style={{ padding: '5px 10px' }}>Sign in</button>
        </Link>
      ) : (
 <div className="relative">

  <div className="flex items-center gap-2 cursor-pointer" onClick={()=>setUserdetails(!userdetails)}>
    <img src={profile} alt="User profile" className="w-8 h-8 rounded-full" />
    <span className="font-medium text-white">
      {user?.username?.split(" ")[0].slice(0, 6)}
    </span>
  </div>
  {/* Dropdown on personal data */}
  {userdetails && (

    <div
      className="absolute right-0 top-full  w-72 border border-gray-700 bg-[#121212] shadow-lg rounded-3xl z-50"
      style={{ padding: "20px", fontFamily: "Poppins, Arial",marginTop:'15px' }}
    >
      <h1 className="font-medium text-[#FFBADE]">
        {user?.username?.split(" ")[0].slice(0, 6)}
      </h1>
      <p className="font-normal text-sm">{user.email}</p><br />

      <div className="flex flex-col gap-2 cursor-pointer">
        <Link to="/userprofile">
        <button className=" user-options w-full font-normal rounded-3xl text-left cursor-pointer bg-[#4d4c5c] leading-[24px] " style={{padding:'7px 10px'}}>
            <i className="fa-solid fa-user"></i> Profile
          </button>
        </Link>

        <Link to="/watchlist">
        <button className=" user-options w-full font-normal rounded-3xl text-left cursor-pointer bg-[#4d4c5c] leading-[24px] " style={{padding:'7px 10px'}}>
            <i className="fa-solid fa-heart"></i> Watch List
          </button>
        </Link>

        <button className=" user-options w-full font-normal rounded-3xl text-left cursor-pointer bg-[#4d4c5c] leading-[24px] " style={{padding:'7px 10px'}}>
          <i className="fa-solid fa-bell"></i> Notification
        </button>

        <button className=" user-options w-full font-normal rounded-3xl text-left cursor-pointer bg-[#4d4c5c] leading-[24px] " style={{padding:'7px 10px'}}>
          <i className="fa-solid fa-gear"></i> Settings
        </button>
      </div>

      <br />

      <button
        onClick={handleLogout}
        className="w-full text-right px-2 py-1 text-red-600 hover:bg-gray-100"
      >
        Logout <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  )}
  </div>

      )}
    </div>

  </nav>
  {bringinput && (

        <div className=" relative"style={{padding:'0px 10px'}}>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search movies..."
            className="  rounded-md border border-gray-300  bg-white"
          />
          <i className="fa fa-search absolute right-5 font-bold top-1/2 -translate-y-1/2 text-black"></i>

        </div>
  )}
              {/* Search Results */}
      {results.length > 0 && (
        <div className=" w-full text-white   bg-[#121212] z-500 flex flex-col gap-2 " >
          <h1 className='text-center font-bold text-2xl md:text-3xl ' >All Results <span className='bg-[#FFBADE] rounded text-black' style={{padding:'3px 5px'}}>{query}</span> </h1>
          {results.map((movie) => (
            <Link
              key={movie.movie_id}
              to={`/player/${movie.movie_id}`}
              className="searched-movie flex gap-2 px-3 py-2 "
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
            >
              <img
                src={
                  movie.movie_image?.startsWith("http")
                    ? movie.movie_image
                    : `${API_URL}/uploads/${movie.movie_image}`
                }
                alt={movie.movie_name}
                className="w-[3rem] h-[4rem] rounded-md object-cover "
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg";
                }}
              />
              <div>
                <p className="text-sm font-medium">
                {highlightText(movie.movie_name, query)}
              </p>

                <div className="flex gap-3">
                  <p className="text-gray-500 text-xs">
                    {new Date(movie.created_at).getFullYear()}
                  </p>
                  <p className="bg-red-500 text-white text-xs rounded-md" style={{padding:"2px 5px"}}>
                    {movie.movie_genre}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <button className='bg-[#FFBADE]  rounded text-black ' style={{padding:'10px 0'}}>View all results <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      )}
</header>

  );
}

export default Navbar;
