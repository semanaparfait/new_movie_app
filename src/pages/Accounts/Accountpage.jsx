import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Accountpage.css';
import bgimage from '../../assets/images/account/bg react.jpg';
import facebook from '../../assets/images/account/facebook.png';
import google from '../../assets/images/account/google.png'
import logo from '../../assets/images/overlay-2.png'

function Accountpage() {
  const [loginTitle, setloginTitle] = useState("Welcome back ! ")
  function toSignup(){
    setloginTitle("Get Started")
    
  }
  const date = new Date();
const year = date.getFullYear();
  return (
 <div className="absolute overflow-hidden  inset-0 bg-[url('https://i.pinimg.com/736x/19/8b/2f/198b2f01e73b905772279616eccc7c65.jpg')] bg-cover bg-center ">

  {/* Navigation */}
<nav className="absolute top-0 left-0 md:left-1/2 transform md:-translate-x-1/2 w-full md:w-[80%] flex justify-between items-center p-4 z-30 text-white ">
<Link to={`/`}>
<img src={logo} alt="weblogo" className='w-[6rem] '/>
</Link>
  <ul className="flex gap-3 text-xs sm:text-base">
    <li className="cursor-pointer font-bold" >Login</li>
    <li className="cursor-pointer font-bold" onClick={toSignup}>Sign up</li>
  </ul>
</nav><br />



  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Centered Content */}
{/* Centered Content */}
<div className='min-h-screen flex items-center justify-center'>
  <div className="right-tect-content text-center text-white space-y-4 w-full max-w-md">
    <h1 className="text-3xl sm:text-4xl font-bold">{loginTitle}</h1>
    <h4 className="text-lg sm:text-2xl">SEMANA SHEMA PARFAIT</h4>

    {/* Inputs */}
    <div className="space-y-3 text-black">
      <input
        type="text"
        placeholder="Enter your Full name"
        className="w-full rounded bg-white/90 outline-none text-sm"
      />
        <input
       type="number"
       placeholder="Enter your Phone number"
       className="w-full rounded bg-white/90 outline-none text-sm"
     />
      <input
        type="text"
        placeholder="Enter your email address"
        className="w-full rounded bg-white/90 outline-none text-sm"
      />
      <input
        type="password"
        placeholder="Enter your password"
        className="w-full rounded bg-white/90 outline-none text-sm"
      />
    </div><br />

    <p className="text-right text-sm text-red-400 cursor-pointer">Forgot your password?</p><br />

    {/* Buttons */}
    <button className='signin-btn'>Sign in</button><br /><br />
    <button className='google-btn '>Continue with Google <img src={google} /></button><br />

  </div>
</div>



</div>


  )
}

export default Accountpage