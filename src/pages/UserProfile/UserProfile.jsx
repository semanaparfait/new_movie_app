import React,{useState,useEffect} from 'react'
import logo from '../../assets/images/overlay-2.png'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import profile from '../../assets/images/profile/logo2.jpg'
import './UserProfile.css'

function UserProfile() {
    const API_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "https://new-movie-app.onrender.com";
    
      const [isLoggedin, setIsLoggedin] = useState(false);
      const [user, setUser] = useState(null);
      const [showpassinputs,setShowpassinputs] = useState(false)
    
      // Check login status
      useEffect(() => {
        fetch(`${API_URL}/api/me`, { 
          method:"GET",
          credentials: "include" })
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
  return (
    <main>
        <Navbar />
<div className="relative h-[23vh] flex flex-col justify-between">

  {/* Blurred Background */}
        <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[7px]"
        style={{
            backgroundImage: `url(${profile})`,
        }}
        ></div>


  {/* Content (no blur) */}
        <div className="relative z-10 flex items-center flex-col justify-between">
            <h1
            className="font-semibold text-3xl leading-[42px] text-center"
            style={{ fontFamily: "Poppins, Arial", marginTop: "25px" }}
            
            >
            Hi, {user?.username?.split(" ")[0]}
            </h1>

            <div className="cursor-pointer flex gap-10 items-center justify-center" style={{marginTop:'40px'}} >
            <Link to="/userprofile">
                <button className="userprofile-links font-medium leading-[24px] cursor-pointer flex gap-1 items-center " title='Profile' style={{ padding: "7px 10px" }}>
                <i className="fa-solid fa-user"></i> 
                <p className='hidden md:block' >Profile</p>
                </button>
            </Link>

            <Link to="/watchlist">
                <button className="userprofile-links font-medium leading-[24px] cursor-pointer flex gap-1 items-center" title='Watch List' style={{ padding: "7px 10px" }}>
                <i className="fa-solid fa-heart"></i>
                 <p className='hidden md:block' >Watch List</p>
                </button>
            </Link>

            <button className="userprofile-links font-medium leading-[24px] cursor-pointer flex gap-1 items-center" title='Notification' style={{ padding: "7px 10px" }}>
                <i className="fa-solid fa-bell"></i> 
                <p className='hidden md:block' >Notification</p>
            </button>

            <button className="userprofile-links font-medium leading-[24px] cursor-pointer flex gap-1 items-center" title='Settings' style={{ padding: "7px 10px" }}>
                <i className="fa-solid fa-gear"></i> 
                <p className='hidden md:block' >Settings</p>
            </button>
            </div>
        </div>
        </div><br /><br />


    <div className='p-[10px] flex flex-col items-center justify-center '>
        <h1 className='font-medium text-3xl leading-[38px]'><i className="fa-solid fa-user"></i>  Edit Profile</h1>
        <div className='flex flex-wrap-reverse justify-center'>
            <div  className='w-[90%] md:w-[50%]' style={{padding:'10px'}}>
                <label className='text-[11px] leading-[24px] font-normal text-[rgb(255,255,255)]'> EMAIL ADDRESS</label>
                <input type="email" className='border-none bg-white' value={user?.email}/>
                <div className='bg-[#2b2a3c] rounded-lg' style={{padding:'10px'}}>
                    <p className='font-medium text-[13px] leading-[24px] text-[#666]'> <i className='fas fa-user-alt-slash'></i> Not Verified</p>
                    <p style={{marginTop:'2px'}} className='font-medium text-[13px] leading-[24px]'>Your account has not been verified. <span className='text-green-500 cursor-pointer'>Click here</span> to resend verification email.</p>
                </div>
                <label className='text-[11px] leading-[24px] font-normal text-[rgb(255,255,255)]'>YOUR NAME</label>
                <input type="text" className='border-none bg-white' value={user?.username}/>
                <label className='text-[11px] leading-[24px] font-normal text-[rgb(255,255,255)]'>JOINED</label>
                <input type="text" disabled className='border-none bg-white' value={user?.created_at}/>
                <label onClick={()=>setShowpassinputs(!showpassinputs)}><i className="fa-solid fa-key"></i> Change password</label><br /><br />
                {showpassinputs && (
                    <div>

                        <label className='text-[11px] leading-[24px] font-normal text-[rgb(255,255,255)]'>CURRENT PASSWORD</label>
                        <input type="password" className='border-none bg-white'/>
                        <label className='text-[11px] leading-[24px] font-normal text-[rgb(255,255,255)]'>NEW PASSWORD</label>
                        <input type="password"className='border-none bg-white'/>
                        <label className='text-[11px] leading-[24px] font-normal text-[rgb(255,255,255)]'>CONFIRM NEW PASSWORD</label>
                        <input type="password" className='border-none bg-white'/>
                    </div>
                )}
                <button className='bg-[#FFBADE] w-full rounded-2xl text-black font-medium' style={{padding:'10px 0'}}>Save</button>
            </div>
            <div className='md:bg-[#2b2a3c] ' style={{padding:'15px'}} >

             <img loading='lazy' src={profile} alt="profile picture" className='w-[8rem] h-[8rem] object-cover rounded-full'/>
            </div>
        </div>

    </div><br /><br />
    <Footer />
     </main>
  )
}

export default UserProfile