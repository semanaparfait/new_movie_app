import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

function CinemaSe() {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  const { episodeid } = useParams();
  const [episode, setEpisode] = useState(null);
  const videoRef = useRef(null);

  // Fetch a single episode by ID
  useEffect(() => {
    fetch(`${API_URL}/api/episode/${episodeid}`) // backend endpoint for single episode
      .then((res) => res.json())
      .then((data) => setEpisode(data))
      .catch((err) => console.error(err));
  }, [episodeid]);

  // Autoplay when episode is loaded
  useEffect(() => {
    if (episode && videoRef.current) {
      videoRef.current.play().catch((err) => console.log(err));
    }
  }, [episode]);

  if (!episode) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-black w-full h-screen">
      {/* Episode Title */}
      <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4 text-center">
        {episode.serie_name} - Episode {episode.episode_number}
      </h1>

      {/* Video Player */}


        <video
    ref={videoRef}
    controls
    autoPlay
    className="w-full h-[80%]  object-contain mb-6 rounded-lg shadow-lg"
    src={episode.episode_video_link}
  >
    Your browser does not support the video tag.
  </video>


    </div>
  );
}

export default CinemaSe;
