import React,{useState,useEffect, lazy} from 'react'
import Seasons_Movies from './Seasons_Movies';
import Episodes_Movie from './Episodes_Movie';

function Movies() {
  const [activeTab, setActiveTab] = useState("movies")
  const [viewmovie, setViewmovie] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
                const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://new-movie-app.onrender.com";
          const[movies, setMovies] = useState([])
      useEffect( ()=>{
        fetch(`${API_URL}/api/movies`)
        .then(res => res.json())
        .then(data => setMovies(data))
        .catch((err) => console.error(err));
      },[])

const deletMovie = (id) => {
  fetch(`${API_URL}/api/movies/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      if (data.movie) {
        alert("Movie deleted successfully");
        setMovies(movies.filter(movie => movie.movie_id !== id));
      } else {
        alert("Failed to delete movie: " + data.message);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Something went wrong.");
    });
};


  return (
    <div>
        <div className='flex flex-wrap gap-4 items-center justify-center mb-6 cursor-pointer'>
      {movies.map((movie)=>(
        <div key={movie.movie_id} className="cursor-pointer" onClick={() => { setSelectedMovie(movie); setViewmovie(true); }}>
           <img
                    src={
                movie.movie_image
                  ? movie.movie_image.startsWith('http')
                  ? movie.movie_image // full URL, use as is
                  : `${API_URL}/uploads/${movie.movie_image}` // uploaded file, prepend API path
                  : 'https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg' // optional fallback if no image
                } alt={movie.movie_name} className="w-[100px] md:w-[190px] rounded-[10px] md:h-[75%]"
                loading='lazy' />
            <h4 className='text-center font-semibold'>{movie.movie_name}</h4>
        </div>
      ))}
        </div>
    {viewmovie && selectedMovie && (
    <div className="fixed inset-0 flex items-center justify-center z-50 " >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black opacity-40 "  onClick={() => { setViewmovie(false); setSelectedMovie(null); }}></div>

      <div className='movie-details  bg-white w-full  md:w-[80%] h-full md:h-fit overflow-y-scroll p-4 rounded-lg relative z-10 ' style={{padding:'10px'}}>
        <h1 className='text-center font-semibold ftext-[20px]'>{selectedMovie.movie_name}</h1><br />
        <i className="fa-solid fa-xmark absolute right-5 top-5 text-[20px] cursor-pointer" onClick={()=>{setViewmovie(false); setSelectedMovie(null);}}></i>
        <div className='flex flex-wrap items-start gap-4 mb-4 '><br />
          <img src={
            selectedMovie.movie_image
            ? selectedMovie.movie_image.startsWith('http')
              ? selectedMovie.movie_image
              : `${API_URL}/uploads/${selectedMovie.movie_image}`
            : 'https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg'
          } alt={selectedMovie.movie_name} className="w-45 h-60 rounded-[10px]" />
          <div >
            <div className='flex items-center gap-10 flex-wrap'>
            <div>
            <label className='font-semibold'> name :</label>
            <h1 >{selectedMovie.movie_name}</h1>
            <label className='font-semibold'>Genre :</label>
            <h1>{selectedMovie.movie_genre}</h1>
            </div>

            <div>
            <label className='font-semibold'>Country:</label>
            <h1>{selectedMovie.movie_country || selectedMovie.country || 'Unknown'}</h1>
            <label className='font-semibold'>Provider: </label>
            <h1>{selectedMovie.provider_name || selectedMovie.category_name || 'Unknown'}</h1>

            </div>

            </div><br />
            <label className='font-semibold'>Trailer Link:</label>
            <p className='text-blue-600 underline break-words whitespace-normal'>{selectedMovie.movie_trailer_link || 'N/A'}</p>
            <label className='font-semibold'>Download Link:</label>
            <p className='text-blue-600 underline break-words whitespace-normal'>{selectedMovie.movie_download_link || 'N/A'}</p>

          </div>
        </div><br />
        <p>{selectedMovie.movie_description || selectedMovie.description || 'No description available.'}</p><br />
        <div className='flex gap-4 justify-end'>
          <i className="fa-solid fa-trash text-red-600 cursor-pointer  text-[20px] " title='delete' onClick={() => deletMovie(selectedMovie.movie_id)}></i>
          <i className="fa-solid fa-pen-to-square text-green-600 cursor-pointer  text-[20px] " title='Edit' onClick={() => EditMovie(selectedMovie.movie_id)}></i>
        </div>
      </div>
    </div>
    )}

      </div>
  )
}

export default Movies