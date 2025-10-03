import React,{useState,useEffect, lazy} from 'react'
import Seasons_Movies from './Seasons_Movies';
import Episodes_Movie from './Episodes_Movie';

function Movies() {
  const [activeTab, setActiveTab] = useState("movies")
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

                  <div className='flex items-center justify-center gap-3 cursor-pointer'>

                        <h4 className="font-bold ml-4" onClick={()=>setActiveTab("movies")}> Movies</h4>
                        <h4 className="font-bold ml-4" onClick={()=>setActiveTab("seasons")}> Seasones</h4>
                        <h4 className="font-bold ml-4" onClick={()=>setActiveTab("episodes")}> Episodes</h4>
                  </div><br />
                {activeTab === "movies" && (

              <div className="overflow-x-auto px-4">
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
                                {movies.map((movie)=>(
                                    
                            <tr key={movie.movie_id}>
                                <td>{movie.movie_id}</td>
                                <td className="flex items-center gap-3">
                                <img                 src={
                                movie.movie_image
                                    ? movie.movie_image.startsWith('http')
                                    ? movie.movie_image // full URL, use as is
                                    : `${API_URL}/uploads/${movie.movie_image}` // uploaded file, prepend API path
                                    : '/https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg' // optional fallback if no image
                                } alt={movie.movie_name} className="w-14 h-19 rounded-[10px]"
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
                                <td title='delete' onClick={() => deletMovie(movie.movie_id)}><i className="fa-solid fa-trash text-red-600 cursor-pointer"></i></td>
                            </tr>
                                ))}

    
                            </tbody>
                        </table>
                        </div>
                )}
                {activeTab === "seasons" &&(
                  <Seasons_Movies />
                )}
                {activeTab === "episodes" && (
                  <Episodes_Movie />
                )}
      </div>
  )
}

export default Movies