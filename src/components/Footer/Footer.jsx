import React from 'react';
import logo from '../../assets/images/The Movies___.jpeg';
import './footer.css'
import playstore from '../../assets/images/google play.png';
import appstore from '../../assets/images/app store.png';
const date = new Date();
const year = date.getFullYear();

function Footer() {
  return (
    <div>
      <div className="flex justify-evenly flex-wrap gap-16">
        <div className="text-white">
          {/* Close img tags properly in JSX */}
          <img src={logo} alt="The Movies Logo" className='w-12 h-16'/><br />
          <p>2050.SEMANA</p><br />
          <p>Kigali - Rwanda</p><br />
          <p>semana.coder.expert@gmail.com</p><br />

          <div className="flex gap-8">
            {/* Font Awesome icons require importing or CDN (make sure included!) */}
            <i className="fa-brands fa-facebook " ></i>
            <i className="fa-brands fa-linkedin "></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-square-x-twitter"></i>
          </div><br />
        </div>

        <div className="text-white container2">
          <h1 className='titles text-2xl font-bold'>About The Movies</h1><br />
          <p>Genres Available</p><br />
          <p>Languages Supported</p><br />
          <p>Streaming Quality</p><br />
          <p>Exclusive Content</p><br />
          <p>Top Rated Movies</p><br /><br />
        </div>

        <div className="container3">
          <h1 className='titles text-2xl font-bold'>Contacts</h1><br />
          <p>+250 787 845 162</p><br />
          <p>+250 722 245 279</p><br />
          <p>+1 234 578 890</p><br />
          <p>semana.coder.expert@gmail.com</p><br />
          <p><a href="contact.html">Via Here</a></p>
        </div>

        <div className="container4">
          <h1 className='titles text-2xl font-bold'>Subscribe for Newsletter</h1><br />
         <input
            type="email"
            placeholder="Enter your email"
            className="text-white placeholder-white border border-gray-300 p-2 rounded"
          /><br /><br />
          <button type="submit">subscribe</button><br /><br /><br />
          <img className="w-35" src={appstore} alt="app store"/><br />
          <img className="w-35" src={playstore} alt="playstore"/><br />

        </div>
      </div>

      <footer>
        &copy; {year} The Movies | All Rights reserved 
      </footer>
    </div>
  );
}

export default Footer;
