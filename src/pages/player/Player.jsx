import React from 'react';
import { useParams } from 'react-router-dom';
import Movies from '../../Data/Movies';
import './Player.css'
import { Link } from 'react-router-dom';
// import video from '../../assets/images/New folder/video.webm'

function Player() {
  const { movieid } = useParams();

  // Helper function to convert YouTube watch URL to embed URL
  const convertToEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) {
        const videoId = urlObj.searchParams.get('v');
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
      // If not a YouTube watch URL, return original
      return url;
    } catch (error) {
      return url;
    }
  };

  // Find the movie by movieid searching all movieslist arrays
  let movie = null;
  for (const provider of Movies) {
    const found = provider.movieslist.find(m => m.movieid === movieid);
    if (found) {
      movie = found;
      break;
    }
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const embedUrl = convertToEmbedUrl(movie.trailer);
  const videoId = (() => {
    try {
      const urlObj = new URL(movie.trailer);
      return urlObj.searchParams.get('v') || '';
    } catch {
      return '';
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
            src={movie.poster} 
            alt="movie poster" 
            className='movie-poster w-[250px] rounded-[10px] h-full'
          /><br/>
          
          <div className="buttons flex gap-4 flex-wrap ">
            <button className='playBtn text-black bg-[white] rounded-[6px] font-bold flex items-center gap-2 px-4 py-2'>
              ▶ Watch Now
            </button>
            <Link to={movie.downloadlink}>
              <button className='downloadBtn bg-[red] rounded-[6px] font-bold px-4 py-2'>
                <i className="fa-solid fa-arrow-down"></i> Download
              </button>
            </Link>
          </div>
        </div>

        <div className='right-movie-details w-[90%] sm:w-[40%]'><br />
          <h1 className='font-black text-[30px]'>{movie.title}</h1><br />
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
            <p>{movie.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti neque eligendi excepturi? Molestiae accusamus nam culpa adipisci expedita. Delectus ducimus illo explicabo incidunt iure maiores corrupti nemo eum dolorum molestiae! </p>
            <div className='flex gap-4.5'>
              <div >
                <p className='font-bold'><i className="fa-solid fa-calendar"></i> Relsead:</p><br />
                <p className='font-bold'>	<i className="fas fa-tags"></i> Genre:</p><br />
                <p className='font-bold'><i className="fa-solid fa-globe"></i> Country:</p><br />
                <p className='font-bold'>	<i className="fas fa-film"></i> Provider:</p><br />
              </div>
              <div>
                <p> {movie.genre}</p><br />
                <p>{movie.genre}</p><br />
                <p>{movie.genre}</p><br />
                <p>{movie.genre}</p><br />
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
