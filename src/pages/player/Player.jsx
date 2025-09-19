import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './Player.css'
import { Link } from 'react-router-dom';
// import video from '../../assets/images/New folder/video.webm'

function Player() {
  // ------------fetching movies---------
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
  const { movieid } = useParams();

  // Helper function to convert YouTube watch URL to embed URL


  // Find the movie by movieid searching all movieslist arrays
  // let movie = null;/
  // for (const provider of movies) {
  //   // const found = provider.movies.find(m => m.movie_id === movie_id);
  //   if (found) {
    //     movie = found;
    //     break;
    //   }
    // }
      const movie = movies.find(m => String(m.movie_id) === String(movieid));

  if (!movie) {
    return <div>Movie not found</div>;
  }
   const convertToEmbedUrl = (url) => {
    if (!url) return "";
    try {
      const urlObj = new URL(url);

      if (urlObj.hostname.includes("youtube.com")) {
        const videoId = urlObj.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (urlObj.hostname.includes("youtu.be")) {
        const videoId = urlObj.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }

      return url; // fallback
    } catch {
      return "";
    }
  };
const embedUrl = convertToEmbedUrl(movie.movie_trailer_link);
 const videoId = (() => {
  try {
    const urlObj = new URL(movie.movie_trailer_link);
    if (urlObj.hostname.includes("youtube.com")) {
      return urlObj.searchParams.get("v");
    }
    if (urlObj.hostname.includes("youtu.be")) {
      return urlObj.pathname.slice(1);
    }
    return "";
  } catch {
    return "";
  }
})();
  return (
    <div>
      <div className='trailer-video fixed inset-0 z-[-1] w-full h-full'>

<iframe
  className="w-full h-full"
  src={`${embedUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1`}
  frameBorder="0"
  allow="autoplay; encrypted-media"
  allowFullScreen
/>

      </div>
      <div className='movie-info flex flex-wrap items-center justify-center sm:justify-evenly absolute '>

        <div className='left-movie-poster w-[90%] sm:w-[40%] flex flex-col items-center'>
          <img 
src={
  movie.movie_image?.startsWith("http")
    ? movie.movie_image
    : `${API_URL}/uploads/${movie.movie_image}`
}

      

            alt="movie poster" 
            className='movie-poster w-[250px] rounded-[10px] h-full'
          /><br/>
          
          <div className="buttons flex gap-4 flex-wrap items-center justify-center">
            <button className='playBtn text-black bg-[white] rounded-[6px] font-bold flex items-center gap-2 px-4 py-2'>
              ▶ Watch Now
            </button>
            <Link to={movie.movie_download_link}>
              <button className='downloadBtn bg-[red] rounded-[6px] font-bold px-4 py-2'>
                <i className="fa-solid fa-arrow-down"></i> Download
              </button>
            </Link>
          </div>
        </div>

        <div className='right-movie-details w-[90%] sm:w-[40%]'><br />
          <h1 className='font-black text-[30px]'>{movie.movie_name}</h1><br />
          <div className='flex gap-3.5 items-center'>
            <p className='font-medium '>24M Watchers</p>
            <div className="likes-cont flex flex-col items-center">
              <i className="fa-solid fa-thumbs-up "></i>
              <p className='likes-btn flex backdrop-blur-md '>86K </p>
            </div>
            <div className="down-count flex flex-col items-center">
              <i className="fa-solid fa-thumbs-down "></i>
              <p className='dislike-btn'>324 </p>
            </div>
          </div>
          <h1 className='description-tittle font-extra font-black '>Description</h1><br />
          <div className='info-container flex flex-col gap-4 '>
            <h2 className='font-black'>Description</h2>
            <p >{movie.movie_description} </p>
            <div className='flex gap-4.5'>
              <div >
                <p className='font-bold'><i className="fa-solid fa-calendar"></i> Relsead:</p><br />
                <p className='font-bold'>	<i className="fas fa-tags"></i> Genre:</p><br />
                <p className='font-bold'><i className="fa-solid fa-globe"></i> Country:</p><br />
                <p className='font-bold'>	<i className="fas fa-film"></i> Provider:</p><br />
              </div>
              <div>
                <p> {movie.movie_released_date}</p><br />
                <p>{movie.movie_genre}</p><br />
                <p>{movie.movie_country}</p><br />
                <p>{movie.category_name}</p><br />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <p>Genre: {movie.genre}</p>
      <p>Year: {movie.year}</p>
      <p>Description: {movie.description}</p>
      <img src={movie.poster} alt={movie.title} style={{ maxWidth: '300px' }} />
      <p>Player page content here</p> */}
    </div>
  );
}

export default Player;
