import React,{useState,useEffect} from 'react'

function Movies() {
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
  return (
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
                                } alt="Tom & Jerry" className="w-14 h-19 rounded-[10px]" />
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
  )
}

export default Movies