import React,{useState,useEffect,useRef,lazy} from 'react';
import { useParams } from 'react-router-dom';
import './Player.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function PlayerSeasons() {
    const navigate = useNavigate();
  const { seasonid } = useParams();

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  const [seasons, setSeasons] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  // Fetch episodes for this season
  useEffect(() => {
    fetch(`${API_URL}/api/episodes/${seasonid}`)
      .then((res) => res.json())
      .then((data) => {
        setSeasons(data);
        if (data.length > 0) setSelectedEpisode(data[0]); // default episode
      })
      .catch((err) => console.error(err));
  }, [seasonid]);

  if (!selectedEpisode) {
    return <div>Loading...</div>;
  }

  // Helper: convert YouTube/watch link into embeddable
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

      return url; // fallback for non-YT links
    } catch {
      return "";
    }
  };

  const embedUrl = convertToEmbedUrl(selectedEpisode.serie_trailer_link);
  const videoId = (() => {
    try {
      const urlObj = new URL(selectedEpisode.serie_trailer_link);
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

    const handlePlay = () => {
    // Navigate to cinema page and pass movie ID
    navigate(`/cinemase/${selectedEpisode.episode_id}`);

  };
  return (
    <main>
      <div>
        {/* Video player */}
        <div className="trailer-video relative w-full min-h-[60vh] md:min-h-[100vh]">
          <iframe
            className="w-full h-[100vh]"
            src={`${embedUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        {/* Movie info */}
        <div className="movie-info flex flex-wrap items-center justify-center sm:justify-evenly absolute md:top-1/5 top-0">
          {/* Left side */}
          <div className="left-movie-poster w-[90%] sm:w-[40%] flex flex-col items-center">
            <img
              src={
                selectedEpisode.serie_image?.startsWith("http")
                  ? selectedEpisode.serie_image
                  : `${API_URL}/uploads/${selectedEpisode.serie_image}`
              }
              alt={selectedEpisode.serie_name}
              className="movie-poster w-[250px] rounded-[10px] h-full"
              loading="lazy"
            />
            <br />

            <div className="buttons flex gap-4 flex-wrap items-center justify-center">
              <button 
              onClick={handlePlay}
              className="playBtn text-black bg-[white] rounded-[6px] font-bold flex items-center gap-2 px-4 py-2">
                ▶ Watch Now
              </button>
              <Link to={selectedEpisode.episode_download_link}>
                <button className="downloadBtn bg-[red] rounded-[6px] font-bold px-4 py-2">
                  <i className="fa-solid fa-arrow-down"></i> Download
                </button>
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="right-movie-details w-[90%] sm:w-[40%]">
            <br />
            <h1 className="font-black text-[30px]">
              <span>Ep {selectedEpisode.episode_number}</span>{" "}
              {selectedEpisode.serie_name}
            </h1>
            
            <br />
            <div className="info-container flex flex-col gap-4 ">
              <h2 className="font-black">Description</h2>
              <p>{selectedEpisode.serie_description} </p>
              <div className="flex gap-4.5">
                <div className='flex flex-col gap-2'>
                  <p className="font-bold">
                    <i className="fa-solid fa-calendar"></i> Relsead:
                  </p>
                  <p className="font-bold">
                    <i className="fas fa-tags"></i> Genre:
                  </p>
                  <p className="font-bold">
                    <i className="fa-solid fa-globe"></i> Country:
                  </p>
                  <p className="font-bold">
                    <i className="fas fa-film"></i> Provider:
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p>
                    {new Date(
                      selectedEpisode.episode_released_date
                    ).toLocaleDateString()}
                  </p>
                  <p>{selectedEpisode.serie_genre}</p>
                  <p>{selectedEpisode.episode_country}</p>
                  <p>{selectedEpisode.category_name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Other episodes */}
          <div className='hidden'>
            <br />
            <br />
            <h1 className="text-center text-2xl">Your Full Episode Guide on {selectedEpisode.serie_name}</h1>
            <br />

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 " style={{paddingLeft:"10px"}}>
              {seasons.map((episode) => (
                <div
                  key={episode.episode_id}
                  onClick={() => setSelectedEpisode(episode)} // ✅ updates top player
                  className="cursor-pointer"
                >
                  <img
                    src={
                      episode.serie_image?.startsWith("http")
                        ? episode.serie_image
                        : `${API_URL}/uploads/${episode.serie_image}`
                    }
                    alt={episode.serie_name}
                    className="movie-poster w-[100px] md:w-[190px] rounded-[10px] md:h-[75%]"
                    loading="lazy"
                  />
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
          </div>
        </div>
      </div>
      <br />
    </main>
  );
}

export default PlayerSeasons;
