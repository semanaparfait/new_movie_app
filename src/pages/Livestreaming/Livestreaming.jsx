import React,{useEffect,useState} from 'react'
import logo from '../../assets/images/live streaming/live-streaming.png'
import './Livestreaming.css'
function Livestreaming() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <div style={{padding:"1rem"}}>
        <nav className='flex justify-between items-center  text-white'  >
          <img src={logo} alt="logo" className='  w-[10rem] ' />
          <p className='bg-green-600 rounded-[10px] font-semibold'style={{padding:"8px 20px"}}><i className="fa-regular fa-star"></i> Request VIP </p>
        </nav>
<div className=' flex flex-col gap-6 items-center justify-center text-white' style={{padding:"2rem"}}>

            <div className="w-fit flex items-center justify-center  bg-red-500/20 border border-red-500/30 text-center rounded-full "style={{padding:"5px 10px"}}>
              <div className="w-2 h-2 bg-red-500 rounded-full "></div>
              <span className="text-red-300 text-sm font-medium" style={{padding:"2px 10px"}}>LIVE SPORTS & ENTERTAINMENT</span>
            </div>
             <h2 className="font-bold text-white text-center " style={{fontSize:"2.5rem"}}>
              Live Sports &
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"> Entertainment</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
              Watch live football, basketball, TV shows, comedy specials, and more! 
              Premium streaming with HD quality and exclusive content. Available exclusively for VIP members.
            </p>
</div>
<div className='relative border border-gray-600 rounded-lg' style={{padding:"30px"}}>
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 px-3 py-1 rounded-full" style={{padding:"5px 10px"}}>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">LIVE</span>
                </div>

                {/* Viewer Count */}
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full" style={{padding:"5px 10px"}}>
                  <i className="fa-solid fa-users"></i>
                  <span className="text-white text-sm">15,247 viewers</span>
                </div>

                <div className='w-full h-[500px] flex flex-col items-center justify-center'>
              <div className="w-15 h-15 flex items-center justify-center rounded-full bg-green-600">
                <i className="fa-solid fa-user-lock text-gray-300 text-lg"></i>
              </div><br />
                  <h3 className="text-2xl font-bold text-white mb-2">VIP Access Required</h3>
                  <p className="text-gray-400">Unlock live sports & entertainment</p>
                  
                </div>
                <div>
                  <div className='flex gap-6 text-white text-2xl cursor-not-allowed 'style={{marginLeft:"20px"}}>
                    <i className="fa-solid fa-video"></i>
                    <i className="fa-solid fa-microphone"></i>
                    <i className="fa-solid fa-gear"></i>
                  </div><br />
                </div>
</div><br />
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/60 transition-colors" style={{padding:"20px"}}>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                {/* <Trophy className="w-6 h-6 text-white" /> */}
                <i className="fa-solid fa-trophy text-[1.3rem]"></i>
              </div><br />
              <h3 className="text-xl font-bold text-white mb-2">Live Sports</h3>
              <p className="text-gray-400">Football, basketball, soccer, tennis, and all major sporting events in HD quality.</p>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/60 transition-colors" style={{padding:"20px"}}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                {/* <Tv className="w-6 h-6 text-white" /> */}
                <i className="fa-solid fa-tv text-[1.3rem]"></i>
              </div><br />
              <h3 className="text-xl font-bold text-white mb-2">TV Shows</h3>
              <p className="text-gray-400">Latest episodes, series premieres, reality shows, and exclusive content.</p>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/60 transition-colors" style={{padding:"20px"}}>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                {/* <Gamepad2 className="w-6 h-6 text-white" /> */}
                <i className="fa-solid fa-gamepad text-[1.3rem]"></i>
              </div><br />
              <h3 className="text-xl font-bold text-white mb-2">Gaming</h3>
              <p className="text-gray-400">Esports tournaments, gaming competitions, and live gameplay streams.</p>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/60 transition-colors" style={{padding:"20px"}}>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                {/* <Laugh className="w-6 h-6 text-white" /> */}
                <i className="fa-solid fa-face-laugh-wink text-[1.3rem]"></i>
              </div><br />
              <h3 className="text-xl font-bold text-white mb-2">Comedy</h3>
              <p className="text-gray-400">Stand-up specials, comedy shows, funny moments, and entertainment content.</p>
            </div>
          </div><br />
                    {/* Features Section */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-16"style={{padding:"30px"}}>
            <h3 className="text-2xl font-bold text-white text-center mb-8">Premium Features</h3><br />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center flex flex-col items-center ">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center ">
                  <i className="fa-solid fa-video text-[1.5rem]"></i>
                </div><br />
                <h4 className="text-lg font-bold text-white mb-2">4K HD Quality</h4>
                <p className="text-gray-400">Crystal clear video with professional audio for the best viewing experience.</p>
              </div>
              <div className="text-center flex flex-col items-center ">
                <div className="w-16 h-16 bg-blue-500  rounded-full flex items-center justify-center ">
                  <i className="fa-solid fa-user text-[1.5rem]"></i>
                </div><br />
                <h4 className="text-lg font-bold text-white mb-2">Live Chat</h4>
                <p className="text-gray-400">Interact with other viewers and share the excitement in real-time.</p>
              </div>
              <div className="text-center flex flex-col items-center ">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i className="fa-solid fa-play"></i>
                </div><br />
                <h4 className="text-lg font-bold text-white mb-2">No Ads</h4>
                <p className="text-gray-400">Uninterrupted viewing experience without any advertisements.</p>
              </div>
            </div>
          </div><br />


            
    </div>
  )
}

export default Livestreaming