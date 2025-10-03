import React, { useEffect, useState , lazy} from 'react'
import logo from '../../assets/images/overlay-2.png'
import { Link } from 'react-router-dom';
import './AdminPage.css'
import Movieupload from '../Accounts/Movieupload';
import Users from '../Users/Users';
import Movies from '../Movies/Movies';
import Categories from '../Categories/Categories';

function AdminPage() {
            const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://new-movie-app.onrender.com";
    const [activeTab, setActiveTab] = useState('dashboard');
      const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://new-movie-app.onrender.com/api/admin/users')
    // fetch('https://new-movie-app.onrender.com/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

    function adminnavbar(){
    return(
    <div className=" block md:hidden fixed bottom-0 w-full bg-black z-50 " style={{padding:'10px'}}>
        <ul className="flex justify-evenly text-white text-sm px-4 py-2">
          <li className="flex flex-col items-center cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <i className="fa-solid fa-house"></i>
            <span>Dashboard</span>
          </li>
          <li className="flex flex-col items-center cursor-pointer" onClick={() => setActiveTab('movies')}>
            <i className="fa-solid fa-bookmark"></i>
            <span>Movies</span>
          </li>
            <li className="flex flex-col items-center cursor-pointer" onClick={() => setActiveTab('categories')}>
            <i className="fa-solid fa-bookmark"></i>
            <span>Categories</span>
          </li>
          <li className="flex flex-col items-center cursor-pointer" onClick={() => setActiveTab('users')}>
            <i className="fa-solid fa-envelope"></i>
            <span>Users</span>
          </li>
          <li className="flex flex-col items-center cursor-pointer" onClick={() => setActiveTab('upload')}>
            <i className="fa-solid fa-user"></i>
            <span>Upload</span>
          </li>
        </ul>
              </div>);
}
      const[movies, setMovies] = useState([])
  useEffect( ()=>{
    fetch(`${API_URL}/api/movies`)
    .then(res => res.json())
    .then(data => setMovies(data))
    .catch((err) => console.error(err));
  },[])

  return (
    <div>

       <div>{adminnavbar()}</div>
        <div className='admin-container'>
              
        <nav className='flex justify-around items-center bg-[#2c3e50] h-[4.5rem] text-[white] fixed w-full z-50' >
            <div>
                <img src={logo} alt="logo" className='w-[5rem]'/>
            </div>
            <div>
                <ul className='gap-5 font-bold cursor-pointer hidden md:flex'>
              <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
              <li onClick={() => setActiveTab('movies')}>Movies</li>
              <li onClick={() => setActiveTab('categories')}>categories</li>
              <li onClick={() => setActiveTab('users')}>Users</li>
              <li onClick={() => setActiveTab('upload')}>Upload</li>
                </ul>
            </div>

            <Link to={"/"}><button className='bg-amber-700 rounded-[5px]' style={{padding:"6px 20px"}}>Home</button></Link>
            

        </nav><br /><br /><br /><br /><br />
        <div>
            {/* by defaoult this is the admin Dashboard */}
            {activeTab === 'dashboard' && (
            <div >
                <div className=" flex flex-wrap justify-around gap-4">
                    
                    <div className="flex items-center justify-center text-[24px] gap-4 rounded-[8px] bg-[white] " style={{ padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>

                        <div className=" bg-[rgba(52,152,219,0.1)] text-[#3498db] rounded-[8px]"style={{padding:'10px'}}>
                        <i className="fas fa-film"></i>
                        </div>
                        <div className="stat-details">
                        <h3 className='text-[24px] text-[black] font-bold'>{movies.length}</h3>
                        <p className='text-[#777] text-[14px]'>Total Movies</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center text-[24px] gap-4 rounded-[8px] bg-[white] " style={{ padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
                        <div className="bg-[rgba(46,204,113,0.1)] text-[#2ecc71] rounded-[8px]" style={{padding:'10px'}}>
                        <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-details">
                        <h3 className='text-[24px] text-[black] font-bold'>{users.length}</h3>
                        <p className='text-[#777] text-[14px]'>Total Users</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center text-[24px] gap-4 rounded-[8px] bg-[white] " style={{ padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
                        <div className="bg-[rgba(231,76,60,0.1)] text-[#f39c12] rounded-[8px]" style={{padding:'10px'}}>
                        <i className="fas fa-star"></i>
                        </div>
                        <div className="stat-details">
                        <h3 className='text-[24px] text-[black] font-bold'>48,362</h3>
                        <p className='text-[#777] text-[14px]'>Total Reviews</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center text-[24px] gap-4 rounded-[8px] bg-[white] " style={{ padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
                        <div className="bg-[rgba(231,76,60,0.1)] bg-[#e74c3c] rounded-[8px]" style={{padding:'10px'}}>
                        <i className="fas fa-dollar-sign"></i>
                        </div>
                        <div className="stat-details">
                        <h3 className='text-[24px] text-[black] font-bold'>$52,489</h3>
                        <p className='text-[#777] text-[14px]'>Monthly Revenue</p>
                        </div>
                    </div>
                    </div><br /><br />
                    {/* most recent users */}
                    <div className="overflow-x-auto px-4">

                        <h4 className='font-bold' style={{marginLeft:'2rem'}}>Most Recent Users</h4><br />
                        <table className='recent-table w-full'>
                            <thead className='bg-gray-100'>
                                <tr>
                                <th>UserID</th>
                                <th>Time</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                
                                </tr>
                            </thead>
                                    <tbody>
                                    {users
                                    .slice(-5) // take top 5
                                    .map(user => (
                                        <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{new Date(user.created_at).toLocaleString()}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phonenumber}</td>
                                        <td>{user.email}</td>
                                       
                                        </tr>
                                    ))}
                                    </tbody>

                        </table>
                    </div><br /><br />
                    {/* most recent movies */}
                        <div className="overflow-x-auto px-4">
                            <div></div>
                        <h4 className="font-bold ml-4">Most Recent Movies</h4><br />
                        <table className="recent-table w-full text-sm md:text-base">
                            <thead className="bg-gray-100 ">
                            <tr>
                                <th>MovieID</th>
                                <th>Movie</th>
                                <th>Time</th>
                                <th>Trailer link</th>
                                <th>Download link</th>
                                <th>Provider</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                                {movies
                                   
                                    .slice(-5) // take top 5
                                    .map((movie) => (
                                    
                            <tr key={movie.movie_id}>
                                <td>{movie.movie_id}</td>
                                <td className="flex items-center gap-3">
                                <img   src={
                                movie.movie_image
                                    ? movie.movie_image.startsWith('http')
                                    ? movie.movie_image // full URL, use as is
                                    : `${API_URL}/uploads/${movie.movie_image}` // uploaded file, prepend API path
                                    : '/https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg' // optional fallback if no image
                                } 
                                alt="Tom & Jerry" 
                                className="w-14 h-19 rounded-[10px]"
                                loading='lazy' />
                                <div>
                                    <h4>{movie.movie_name}</h4>
                                    <p className="text-gray-500 ">{movie.movie_genre}</p>
                                </div>
                                </td>
                                <td>{movie.created_at}</td>
                                <td className="text-blue-600 underline">{movie.movie_trailer_link}</td>
                                <td className="text-blue-600 underline">{movie.movie_download_link}</td>
                                <td>{movie.category_name}</td>
                            </tr>
                                ))}

    
                            </tbody>
                        </table>
                        </div>

            </div>
            )}

            {/* movies page */}
            {activeTab === 'movies' && (
               <Movies/>
            )}
            {/* categories page */}
            {activeTab === 'categories' && (
               <Categories />
            )}

            {/* ------userspage------- */}
            {activeTab === 'users' && (
                <Users/>
            )}

            {/* -------------upload----movie------- */}
            {activeTab === 'upload' && (
                    <Movieupload />
            )}
        </div>
    </div>
     </div>
  )
}

export default AdminPage