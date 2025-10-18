import React from 'react'
import "./About.css"

function About() {
  return (
    <section className="min-h-screen bg-slate-950">
        <div className='flex flex-col items-center justify-center '>
            <h1 className=' rounded-2xl bg-slate-400/50 backdrop-blur-sm border border-slate-800'style={{padding:'8px 20px'}}><i className="fa-solid fa-tv"></i> Welcome to Movieland</h1><br />
            <h1 className='font-bold text-5xl text-center'>Bringing Movies <br /> <span className='text-yellow-500'>Closer to You</span></h1><br />
            <p className='text-center'>Experience the magic of cinema in kinyarwanda with our talented interpreters, or enjoy <br /> films in their original language. Your entertainment, your choice.</p>
        </div>
        <div className='  flex flex-col items-center justify-center gap-10 ' style={{padding:'10px'}}>
            <div className=' rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800' style={{padding:'20px'}}>
                <h1 className='font-bold text-3xl'>Our Mission</h1><br />
                <p>At Movie Land, our mission is to bring the magic of cinema to everyone, anywhere. We aim to create a modern platform where movie lovers can easily explore, stream, and enjoy high-quality films across all genres. Our goal is to connect people through stories, inspire creativity, and make entertainment accessible, affordable, and enjoyable for all.</p>
            </div>
            <div className='bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl' style={{padding:'20px'}}>
                <h1 className='font-bold text-3xl'>Our Vision</h1><br />
                <p>Our vision is to be the leading online destination for movie enthusiasts worldwide, known for our diverse and extensive film library, user-friendly experience, and commitment to quality. We aspire to foster a global community of cinephiles who share a passion for storytelling and cultural exchange through the art of film. By continuously innovating and adapting to the evolving digital landscape, we aim to set new standards in the entertainment industry and become a household name synonymous with exceptional movie experiences.</p>
            </div>
        </div>

        <div ><br />
            <h1 className="text-4xl font-bold text-white text-center ">
            What Makes Us <span className="text-red-600">Different</span>
          </h1><br /><br />
            <div  className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                 <div className='"bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl ' style={{padding:'20px 10px'}}>
                     <i className="fa-solid fa-star text-yellow-500  border rounded-2xl w-fit" style={{padding:'15px'}}></i>
                    <h1 className='font-bold text-2xl'>Famous Interpreters</h1>
                    <p>talented actors and filmmakers from around the world.</p>
                </div>
                 <div className='"bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl ' style={{padding:'20px 10px'}}>
                     <i className="fa-solid fa-trophy text-green-500  border rounded-2xl w-fit" style={{padding:'15px'}}></i>
                    <h1 className='font-bold text-2xl'>Award Winners</h1>
                    <p>Featuring critically acclaimed and award-winning masterpieces</p>
                </div>
                 <div className='"bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl ' style={{padding:'20px 10px'}}>
                    <i className="fa-solid fa-earth-americas text-blue-700  border rounded-2xl w-fit" style={{padding:'15px'}}></i>
                    <h1 className='font-bold text-2xl'>Global cinema</h1>
                    <p>Diverse stories from every corner of the globe</p>
                </div>
                <div className='"bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl ' style={{padding:'20px 10px'}}>
                    <i className="fa-solid fa-crown text-red-500 border rounded-2xl w-fit" style={{padding:'15px'}}></i>
                    <h1 className='font-bold text-2xl'>Premium Experience</h1>
                    <p>Stunning visuals and seamless browsing experience</p>
                </div>
            </div>
        </div><br /><br />

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl " style={{padding:'12px 0px'}}>
            <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center">
                <div className="text-5xl font-bold text-yellow-600 mb-2">100+</div>
                <p className="text-slate-400">Curated Films</p>
                </div>
                <div className="text-center">
                <div className="text-5xl font-bold text-yellow-600 mb-2">50K+</div>
                <p className="text-slate-400">Active Members</p>
                </div>
                <div className="text-center">
                <div className="text-5xl font-bold text-yellow-600 mb-2">40+</div>
                <p className="text-slate-400">Countries Reached</p>
                </div>
            </div>
            </div>
                <div className="text-center "style={{marginTop:'5rem'}}>
          <h2 className="text-3xl font-bold text-white " style={{marginBottom:'1.5rem'}}>
            Join the <span className="text-yellow-600">MovieLand</span> Community
          </h2>
          <p className="text-lg text-slate-400  text-center">
            Discover your next favorite film and connect with fellow cinema lovers
          </p><br />
          <button className=" bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/50 hover:scale-105 transform inline-flex items-center gap-2" style={{padding:'10px 20px'}}>
            {/* <Users className="w-5 h-5" /> */}
            <i className="fa-solid fa-users"></i>
            Get Started Today
          </button>
        </div>

    </section>
  )
}

export default About