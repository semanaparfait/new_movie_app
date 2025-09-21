import React from 'react'
import { Link } from 'react-router-dom';
import './Building.css'

function Building() {
  return (
    <div>
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-center " style={{padding:"2rem"}}>
            <Link to="/" >
        <i className="back-btn fa-solid fa-arrow-left absolute left-[50px] top-[30px] "></i>
            </Link>
        <h1 className="text-5xl md:text-8xl font-bold text-white mb-4 animate-fade-in">
          Under
          <span className="block  animate-gradient">
            Construction
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
          We're building something amazing for you!
        </p><br />

        {/* Progress Bar */}
        <div className="max-w-md mx-auto  w-full ">
          <div className="bg-gray-700 rounded-full h-3 w-full ">
            <div className="bg-green-600 h-3 rounded-full animate-progress" style={{width: '75%'}}></div>
          </div>
          <p className="text-sm text-gray-400">Progress: 75% Complete</p>
        </div><br />
 {/* Come Back Message */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl  border border-white/20 animate-float"style={{padding:"2rem", marginBottom:"2rem"}}>
          <div className="flex justify-center mb-4">
            <i className="fa-solid fa-clock text-green-400 animate-spin-slow text-5xl"></i>
            {/* <Clock size={32} className="text-green-400 animate-spin-slow" /> */}
          </div><br />
          <h3 className="text-2xl font-semibold text-white mb-3">
            Check Back Tomorrow!
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            We're putting the finishing touches on our new website.
            <br />
            Come back tomorrow and we hope it will be available!
          </p>
        </div>

        {/* Animated Elements */}
        <div className="flex justify-center items-center space-x-8 text-gray-400">
          <div className="flex items-center space-x-2 animate-pulse">
            {/* <Zap size={20} className="text-yellow-400" /> */}
            <span>Coding</span>
          </div>
          <div className="flex items-center space-x-2 animate-pulse delay-200">
            {/* <Hammer size={20} className="text-orange-400" /> */}
            <span>Building</span>
          </div>
          <div className="flex items-center space-x-2 animate-pulse delay-400">
            {/* <Wrench size={20} className="text-blue-400" /> */}
            <span>Testing</span>
          </div>
        </div>

        {/* Countdown or Contact */}
        <div className="mt-12 text-gray-500">
          <p className="text-sm">
            Expected launch: <span className="text-green-400 font-semibold">Tomorrow</span>
          </p>
        </div>
      </div>


    </div>
    
    
  )
}

export default Building