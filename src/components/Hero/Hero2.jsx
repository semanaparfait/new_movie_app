import React from 'react'
import Movies from '../../Data/Movies'

function Hero2() {
  return (
    <div>
          <div >
      <div className='flex items-center justify-between'>
      <h1 className='font-bold text-2xl'>Most recent</h1>
      <div className='flex gap-4'>
        <i className="fa-solid fa-arrow-left"></i>
        <i className="fa-solid fa-arrow-right"></i>
      </div>
      </div><br />
<div className="p-4">
  {/** Step 1: Get all unique genres from all movies */}
  {[...new Set(
    Movies.flatMap(provider => 
      provider.movieslist.map(movie => movie.genre)
    )
  )].map((genre, idx) => (
    <div key={idx} className="mb-8">
      {/* Genre Title */}
      <h2 className="text-xl font-bold mb-4 capitalize">{genre}</h2>

      {/* Scrollable Movies List */}
      <div className="flex gap-4 overflow-x-scroll scrollbar-hidden">
        {Movies.flatMap(provider =>
          provider.movieslist
            .filter(movie => movie.genre === genre)
            .map(movie => (
              <div key={movie.movieid} className="movie-card flex flex-col items-center flex-shrink-0 relative">
                <div className='relative'>
                  <img src={movie.poster} alt={movie.title} className="movie-poster w-[280px] h-[160px] object-cover rounded-xl cursor-progress" />
                  <img src={provider.movieproviderlogo} className='w-[18px] absolute bottom-4 right-2.5' />
                </div>
                <div className='overlay-subscription w-fit absolute top-0'>
                  <img
                    src={provider.movieproviderlogo}
                    alt="Provider Logo"
                    className='w-[280px] h-[160px] object-cover rounded-xl'
                  />
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  ))}
</div>


    </div><br />
    </div>
  )
}

export default Hero2;