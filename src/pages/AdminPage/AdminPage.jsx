import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/overlay-2.png'
import { Link } from 'react-router-dom';
import './AdminPage.css'

function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard');
      const [users, setUsers] = useState([]);
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";

useEffect(() => {
  fetch(`${API_BASE_URL}/api/admin/users`)
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
  return (
    <div>

       <div>{adminnavbar()}</div>
        <div className='admin-container'>
              
        <nav className='flex justify-around items-center bg-[#2c3e50] h-[4.5rem] text-[white] '>
            <div>
                <img src={logo} alt="logo" className='w-[5rem]'/>
            </div>
            <div>
                <ul className='gap-5 font-bold cursor-pointer hidden md:flex'>
              <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
              <li onClick={() => setActiveTab('movies')}>Movies</li>
              <li onClick={() => setActiveTab('users')}>Users</li>
              <li onClick={() => setActiveTab('upload')}>Upload</li>
                </ul>
            </div>
            

        </nav><br /><br />
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
                        <h3 className='text-[24px] text-[black] font-bold'>2,584</h3>
                        <p className='text-[#777] text-[14px]'>Total Movies</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center text-[24px] gap-4 rounded-[8px] bg-[white] " style={{ padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
                        <div className="bg-[rgba(46,204,113,0.1)] text-[#2ecc71] rounded-[8px]" style={{padding:'10px'}}>
                        <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-details">
                        <h3 className='text-[24px] text-[black] font-bold'>18,249</h3>
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
                                <th>Password</th>
                                </tr>
                            </thead>
                                    <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{new Date(user.created_at).toLocaleString()}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phonenumber}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        </tr>
                                    ))}
                                    </tbody>

                        </table>
                    </div><br /><br />
                    {/* most recent movies */}
                        <div className="overflow-x-auto px-4">
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
                            <tr>
                                <td>1</td>
                                <td className="flex items-center gap-3">
                                <img src="https://i.pinimg.com/736x/72/45/33/7245339ec43e8974cfa2c1bf8dec6752.jpg" alt="Tom & Jerry" className="w-14 h-19 rounded-[10px]" />
                                <div>
                                    <h4>Tom & Jerry</h4>
                                    <p className="text-gray-500 ">Animation, Comedy</p>
                                </div>
                                </td>
                                <td>01/01/2050 12:00 AM</td>
                                <td className="text-blue-600 underline">https://youtube.com/tomtrailer</td>
                                <td className="text-blue-600 underline">https://drive.com/tomdownload</td>
                                <td>Yanga</td>
                            </tr>

                            <tr>
                                <td>2</td>
                                <td className="flex items-center gap-3">
                                <img src="https://i.pinimg.com/1200x/ad/13/20/ad13206fb7b7b05541b3bc2a7281fd2f.jpg" alt="Inception" className="w-14 h-19 rounded-[10px]" />
                                <div>
                                    <h4>Inception</h4>
                                    <p className="text-gray-500 text-xs">Sci-Fi, Thriller</p>
                                </div>
                                </td>
                                <td>03/01/2050 09:00 PM</td>
                                <td className="text-blue-600 underline">https://youtube.com/inceptiontrailer</td>
                                <td className="text-blue-600 underline">https://drive.com/inception</td>
                                <td>Mindflix</td>
                            </tr>

                            <tr>
                                <td>3</td>
                                <td className="flex items-center gap-3">
                                <img src="https://i.pinimg.com/736x/d1/cf/65/d1cf65296a5d542ec07856a60cd992ec.jpg" alt="Black Panther" className="w-14 h-19 rounded-[10px]" />
                                <div>
                                    <h4>Black Panther</h4>
                                    <p className="text-gray-500 text-xs">Action, Marvel</p>
                                </div>
                                </td>
                                <td>04/01/2050 01:30 PM</td>
                                <td className="text-blue-600 underline">https://youtube.com/blackpanther</td>
                                <td className="text-blue-600 underline">https://drive.com/bpdownload</td>
                                <td>WakandaFlix</td>
                            </tr>

                            <tr>
                                <td>4</td>
                                <td className="flex items-center gap-3">
                                <img src="https://i.pinimg.com/736x/cf/16/40/cf1640c51e2b423efb92963d4927fe38.jpg" alt="Avatar" className="w-14 h-19 rounded-[10px]" />
                                <div>
                                    <h4>Avatar</h4>
                                    <p className="text-gray-500 text-xs">Fantasy, Adventure</p>
                                </div>
                                </td>
                                <td>05/01/2050 10:15 AM</td>
                                <td className="text-blue-600 underline">https://youtube.com/avatar</td>
                                <td className="text-blue-600 underline">https://drive.com/avatar</td>
                                <td>Pandora Studios</td>
                            </tr>

                            <tr>
                                <td>5</td>
                                <td className="flex items-center gap-3">
                                <img src="https://i.pinimg.com/1200x/1b/06/ce/1b06ce230340db050811d1836506714f.jpg" alt="Fast & Furious" className="w-14 h-19 rounded-[10px]" />
                                <div>
                                    <h4>Fast & Furious 9</h4>
                                    <p className="text-gray-500 text-xs">Action, Racing</p>
                                </div>
                                </td>
                                <td>06/01/2050 03:00 PM</td>
                                <td className="text-blue-600 underline">https://youtube.com/f9</td>
                                <td className="text-blue-600 underline">https://drive.com/fast9</td>
                                <td>Universal</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

            </div>
            )}

            {/* movies page */}
            {activeTab === 'movies' && (

            <div >
                        <div className="overflow-x-auto px-4">
                        {/* <div className="flex gap-2 fixed top-[11%] left-1/2 transform -translate-x-1/2  md:w-[30%]">
                        <input
                            type="text"
                            placeholder="Which movie are you looking for?"
                              className="  text-center border border-black rounded"
                              style={{border:'2px solid black'}}
                        />
                        <button className='border rounded-[10px]'>Search</button>
                        </div>


                        <h4 className="font-bold text-center">All movie on website</h4><br /> */}
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
                            <tr>
                                <td>1</td>
                                <td className="flex items-center gap-3">
                                <img src="https://i.pinimg.com/736x/72/45/33/7245339ec43e8974cfa2c1bf8dec6752.jpg" alt="Tom & Jerry" className="w-14 h-19 rounded-[10px]" />
                                <div>
                                    <h4>Tom & Jerry</h4>
                                    <p className="text-gray-500 ">Animation, Comedy</p>
                                </div>
                                </td>
                                <td>01/01/2050 12:00 AM</td>
                                <td className="text-blue-600 underline">https://youtube.com/tomtrailer</td>
                                <td className="text-blue-600 underline">https://drive.com/tomdownload</td>
                                <td>Yanga</td>
                            </tr>

                            <tr>
                                <td>2</td>
                                <td className="flex items-center gap-3">
                                <img src="https://i.pinimg.com/1200x/ad/13/20/ad13206fb7b7b05541b3bc2a7281fd2f.jpg" alt="Inception" className="w-14 h-19 rounded-[10px]" />
                                <div>
                                    <h4>Inception</h4>
                                    <p className="text-gray-500 text-xs">Sci-Fi, Thriller</p>
                                </div>
                                </td>
                                <td>03/01/2050 09:00 PM</td>
                                <td className="text-blue-600 underline">https://youtube.com/inceptiontrailer</td>
                                <td className="text-blue-600 underline">https://drive.com/inception</td>
                                <td>Mindflix</td>
                            </tr>

                            <tr>
                                <td>3</td>
                                <td className="flex items-center gap-3">
                                <img src="https://i.pinimg.com/736x/d1/cf/65/d1cf65296a5d542ec07856a60cd992ec.jpg" alt="Black Panther" className="w-14 h-19 rounded-[10px]" />
                                <div>
                                    <h4>Black Panther</h4>
                                    <p className="text-gray-500 text-xs">Action, Marvel</p>
                                </div>
                                </td>
                                <td>04/01/2050 01:30 PM</td>
                                <td className="text-blue-600 underline">https://youtube.com/blackpanther</td>
                                <td className="text-blue-600 underline">https://drive.com/bpdownload</td>
                                <td>WakandaFlix</td>
                            </tr>

                            <tr>
                                <td>4</td>
                                <td className="flex items-center gap-3">
                                <img src="https://i.pinimg.com/736x/cf/16/40/cf1640c51e2b423efb92963d4927fe38.jpg" alt="Avatar" className="w-14 h-19 rounded-[10px]" />
                                <div>
                                    <h4>Avatar</h4>
                                    <p className="text-gray-500 text-xs">Fantasy, Adventure</p>
                                </div>
                                </td>
                                <td>05/01/2050 10:15 AM</td>
                                <td className="text-blue-600 underline">https://youtube.com/avatar</td>
                                <td className="text-blue-600 underline">https://drive.com/avatar</td>
                                <td>Pandora Studios</td>
                            </tr>

                            <tr>
                                <td>5</td>
                                <td className="flex items-center gap-3">
                                <img src="https://i.pinimg.com/1200x/1b/06/ce/1b06ce230340db050811d1836506714f.jpg" alt="Fast & Furious" className="w-14 h-19 rounded-[10px]" />
                                <div>
                                    <h4>Fast & Furious 9</h4>
                                    <p className="text-gray-500 text-xs">Action, Racing</p>
                                </div>
                                </td>
                                <td>06/01/2050 03:00 PM</td>
                                <td className="text-blue-600 underline">https://youtube.com/f9</td>
                                <td className="text-blue-600 underline">https://drive.com/fast9</td>
                                <td>Universal</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

            </div>
            )}

            {/* ------userspage------- */}
            {activeTab === 'users' && (
            <div >
                    <div className="overflow-x-auto px-4">
{/* 
                        <h4 className='font-bold' style={{marginLeft:'2rem'}}>Most Recent Users</h4><br /> */}
                        <table className='recent-table w-full'>
                            <thead className='bg-gray-100'>
                                <tr>
                                <th>UserID</th>
                                <th>Time</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Password</th>
                                </tr>
                            </thead>
                                    <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{new Date(user.created_at).toLocaleString()}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phonenumber}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                        </table>
                    </div>

            </div>
            )}

            {/* -------------upload----movie------- */}
            {activeTab === 'upload' && (
            <div className='flex flex-col gap-4 items-center justify-center ' style={{padding:'10px'}}>
                <form action="" className='flex flex-col gap-4 items-center justify-center w-full md:w-[40%]'>
                <label className="block">
                <span className="text-sm font-medium text-gray-700">Upload Movie poster</span>
                <input 
                    type="file" 
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white file:mr-4 file:py-2 file:px-4
                            file:rounded file:border-0 file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700"
                />
                </label>
                <input type="text" 
                placeholder='Movie poster if is link'/>

                <input type="text" 
                placeholder='Movie name'/>
                                <label className="block">
                <span className="text-sm font-medium text-gray-700">Upload Movie video</span>
                <input 
                    type="file" 
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white file:mr-4 file:py-2 file:px-4
                            file:rounded file:border-0 file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700"
                />
                </label>
                <textarea name="" id=""
                placeholder='movie description'></textarea>
                <input type="text" 
                placeholder='movie trailer' />
                <input type="text" 
                placeholder='movie download link' />
                <input type="text"
                placeholder='movie genre: action/drama ..' />
                <input type="text"
                placeholder='Movie country' />
                <input type="text"
                placeholder='Relseasd date' />
                <input type="text" placeholder='movie provider e.g: netflix, rocky...' />
                <button className=' bg-[green] rounded-[10px]' style={{padding:'5px 15px'}}>Upload</button>
                </form>
            </div>
            )}
        </div>
    </div>
     </div>
  )
}

export default AdminPage