import React, {useState} from 'react'
import profile from '../../assets/images/profile.jpg'
import { Link } from 'react-router-dom'
import homelogo from '../../assets/images/homelogo2.png'
import './Navbar.css'
import { isLoggedin } from '../Hero/Hero'


function Navbar() {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
    console.log("Searching for:", event.target.value);
  };
  return (
    <div className='navbar hidden md:block '>
        <nav className='flex justify-between items-center w-full  mx-auto pt-11 '>
            <div>
                <img src={homelogo} alt="home logo" className=' w-[2.5rem] '/>
            </div>
<div className="hidden sm:block">
  <ul className="flex gap-8">
    <li>Home</li>
    <li>Watchlist</li>
    <Link to="/contactus">
      <li>Contact us</li>
    </Link>
  </ul>
</div>

             <div className="search-bar">
                <input type="text"
                value={query}
                onChange={handleSearch}
                 placeholder="Search movies..." />
                <a href="#"><i className="fa fa-search"></i></a>
            </div>
            <Link to={isLoggedin ? "/userprofile" : "/account"}>
            <div className='flex items-center gap-4'>
          <img src={profile} alt="profile picture" className="w-6 sm:w-8 rounded-full" />


                {/* <i className="fas fa-chevron-down text-xl"></i> */}

            </div>
            </Link>
        </nav>
        
    </div>
  )
}

export default Navbar