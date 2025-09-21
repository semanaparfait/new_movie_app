import React,{useState,useEffect} from 'react'
import logo from '../../assets/images/overlay-2.png'
import { Link } from 'react-router-dom'

function UserProfile() {
    const API_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "https://new-movie-app.onrender.com";
    
      const [isLoggedin, setIsLoggedin] = useState(false);
      const [user, setUser] = useState(null);
    
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
    <nav className="pl-4 sm:pl-10">
    <Link to={`/`}>
    <img src={logo} alt="logo" className="w-[10rem]" />
    </Link>
</nav>

    <div className='p-[10px] flex flex-col items-center justify-center'>
        <div className='flex flex-wrap gap-8  w-[80%] items-center '>
            <div>
                <img src="https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg" alt="profile picture" className='w-[7rem] object-cover rounded-full'/>
            </div>
            <div>
                <h3 className='font-bold'>{user?.username}</h3>
                <p className='text-[green]'>Active</p>
                <p>ID: {user?.id}RFDS</p>
            </div>
        </div><br /><br />
        <div className=' w-[80%]'>
            <div className='flex justify-between'>
                 <h3 className='font-bold'>Personal Information</h3>
                <button className='border rounded-2xl 'style={{ padding: '1px 10px' }}>Edit <i className="fa-solid fa-pen-to-square"></i></button>
            </div><br />
            <div className='flex flex-wrap gap-15'>
                <div>
                <div>
                    <p>First Name:</p>
                     <h3 className='font-bold'>{user?.username}</h3>
                </div><br />
                <div>
                    <p>Last Name:</p>
                     <h3 className='font-bold'>- - -</h3>
                </div>

                </div>
                <div>
                    <div>
                        <p>Email Address:</p>
                         <h3 className='font-bold'>{user?.email}</h3>
                    </div><br />
                    <div>
                        <p>Phone Number:</p>
                         <h3 className='font-bold'>{user?.phonenumber}</h3>
                    </div>
                </div>
            </div>

        </div><br /><br />
        <div className="w-[80%] ">
             <h3 className='font-bold'>Account Status</h3><br />
            <p>Activated:</p>
             <h3 className='font-bold'>{user?.created_at}</h3>
        </div>
    </div>
     </main>
  )
}

export default UserProfile