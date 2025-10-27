import React,{useState,useEffect, lazy} from 'react'
import Seasons_Movies from './Seasons_Movies';
import Episodes_Movie from './Episodes_Movie';

function AllEpisodes() {
  const [activeTab, setActiveTab] = useState("movies")
  const [viewmovie, setViewmovie] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
                const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://new-movie-app.onrender.com";

                const[episodes, setEpisodes] = useState([])
      useEffect( ()=>{
        fetch(`${API_URL}/api/episodes`)
        .then(res => res.json())
        .then(data => setEpisodes(data))
        .catch((err) => console.error(err));
      },[])


const deletMovie = (episodeid) => {
  fetch(`${API_URL}/api/episode/${episodeid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      if (data.episode) {
        alert("Movie deleted successfully");
        setEpisodes(episodes.filter(episode => episode.episode_id !== episodeid));
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
        <div className='grid grid-cols-3 md:grid-cols-6 gap-3 cursor-pointer'>
      {episodes.map((episode)=>(
        <div key={episode.episode_id} className="cursor-pointer" onClick={() => { setSelectedMovie(episode); setViewmovie(true); }}>
           <img
                    src={
                episode.serie_image
                  ? episode.serie_image.startsWith('http')
                  ? episode.serie_image // full URL, use as is
                  : `${API_URL}/uploads/${episode.serie_image}` // uploaded file, prepend API path
                  : 'https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg' // optional fallback if no image
                } alt={episode.serie_name} className=" w-[100px] md:w-[190px] rounded-[10px] md:h-[75%]"
                loading='lazy' />
                              <div>
                    <p
                      className="font-medium"
                      style={{ fontFamily: "Hind, Arial, sans-serif" }}
                    >
                      {episode.serie_name}
                    </p>
                    <p className="text-[#929292] ">
                      Episode {episode.episode_number}
                    </p>
                  </div>
        </div>
      ))}
        </div>
    {viewmovie && selectedMovie && (
    <div className="fixed inset-0 flex items-center justify-center z-50 " >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black opacity-40 "  onClick={() => { setViewmovie(false); setSelectedMovie(null); }}></div>

      <div className='movie-details  bg-white w-full max-w-3xl md:w-[80%] p-4 rounded-lg relative z-10 ' style={{padding:'10px'}}>
        <h1 className='text-center font-semibold ftext-[20px]'>{selectedMovie.serie_name}</h1><br />
        <i className="fa-solid fa-xmark absolute right-5 top-5 text-[20px] cursor-pointer" onClick={()=>{setViewmovie(false); setSelectedMovie(null);}}></i>
        <div className='flex items-start gap-4 mb-4 '><br />
          <img src={
            selectedMovie.serie_image
            ? selectedMovie.serie_image.startsWith('http')
              ? selectedMovie.serie_image
              : `${API_URL}/uploads/${selectedMovie.serie_image}`
            : 'https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg'
          } alt={selectedMovie.movie_name} className="w-45 h-60 rounded-[10px]" />
          <div className="flex-1 min-w-0">
            <div className='flex items-center gap-10 flex-wrap'>
            <div>
            <label className='font-semibold'> name :</label>
            <h1 >{selectedMovie.serie_name}</h1>
            <label className='font-semibold'>Genre :</label>
            <h1>{selectedMovie.serie_genre}</h1>
            <label className='font-semibold'>Episode :</label>
            <h1>Episode {selectedMovie.episode_number}</h1>
            </div>

            <div>
            <label className='font-semibold'>Country:</label>
            <h1>{selectedMovie.episode_country || 'Unknown'}</h1>
            <label className='font-semibold'>Provider: </label>
            <h1>{selectedMovie.provider_name || selectedMovie.category_name || 'Unknown'}</h1>

            </div>

            </div><br />
            <label className='font-semibold'>Trailer Link:</label>
            <p className='text-blue-600 underline break-words whitespace-normal'>{selectedMovie.serie_trailer_link || 'N/A'}</p>
            <label className='font-semibold'>Download Link:</label>
            <p className='text-blue-600 underline break-words whitespace-normal'>{selectedMovie.episode_download_link || 'N/A'}</p>

          </div>
        </div><br />
        <p>{selectedMovie.serie_description  || 'No description available.'}</p><br />
          <i className="fa-solid fa-trash text-red-600 cursor-pointer absolute right-5 bottom-2 text-[20px] " title='delete' onClick={() => deletMovie(selectedMovie.episode_id)}></i>
      </div>
    </div>
    )}

      </div>
  )
}

export default AllEpisodes