import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

function CinemaSe() {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  const { episodeid } = useParams();
  const [episode, setEpisode] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const episodesCacheRef = useRef({});

  const videoRef = useRef(null);

  // Fetch episode then fetch seasons; use cache to avoid repeat requests for the same series
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    setEpisode(null);
    setSelectedEpisode(null);
    setSeasons([]);

    fetch(`${API_URL}/api/episode/${episodeid}`, { signal: controller.signal, cache: 'force-cache' })
      .then((res) => res.json())
      .then((ep) => {
        if (cancelled) return;
        setEpisode(ep);
        setSelectedEpisode(ep);

        const serieId = ep.serie_id || ep.serieId || ep.serieid;
        if (!serieId) return;

        const cacheKey = String(serieId);
        const cached = episodesCacheRef.current[cacheKey];
        if (cached) {
          setSeasons(cached);
          // prefer matching item from cache as selectedEpisode (ensures same object shape)
          const match = cached.find((e) => String(e.episode_id) === String(ep.episode_id));
          if (match) setSelectedEpisode(match);
          return;
        }

        return fetch(`${API_URL}/api/episodes/${serieId}`, { signal: controller.signal, cache: 'force-cache' })
          .then((res) => res.json())
          .then((seasonsData) => {
            if (cancelled) return;
            const list = seasonsData || [];
            episodesCacheRef.current[cacheKey] = list;
            setSeasons(list);
            // if selectedEpisode wasn't replaced above, pick first
            if (!selectedEpisode && list.length > 0) setSelectedEpisode(list[0]);
          });
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [episodeid]);

  // Autoplay when selectedEpisode changes
  useEffect(() => {
    if (selectedEpisode && videoRef.current) {
      videoRef.current.load?.();
      videoRef.current.play?.().catch(err => console.log(err));
    }
  }, [selectedEpisode]);

  return (
    <section className="flex justify-center flex-wrap-reverse" style={{ padding: 0 }}>
      {/* Episode List */}
      <div className="md:w-[30%] w-full bg-[#28292e] " style={{padding:'20px 5px'}}>
        <h1 className="font-bold text-lg leading-normal mb-4">List of all episodes</h1>
        <div className="flex gap-3 w-full py-2 overflow-x-auto flex-nowrap md:flex-wrap" style={{ paddingLeft: "5px" }}>
          {seasons.map(ep => (
            <div
              key={ep.episode_id}
              onClick={() => setSelectedEpisode(ep)}
              className={`cursor-pointer flex-shrink-0 p-1 rounded-lg ${
                selectedEpisode?.episode_id === ep.episode_id
                  ? "border-2 border-[#f25b29]"
                  : "border border-transparent"
              }`}
            >
              <p className={`text-sm bg-[#535458] rounded-lg  ${
                selectedEpisode?.episode_id === ep.episode_id ? "text-[#f25b29]" : "text-[#eeeeee]"
              }`} style={{padding:'10px 10px'}}>
                Ep {ep.episode_number}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player */}
<div className="relative md:w-[70%] h-screen rounded-lg overflow-hidden shadow-lg bg-black">
  <video
    ref={videoRef}
    controls={true} // remove native controls
    autoPlay
    preload="metadata"
    onPause={() => setIsPaused(true)}
    onPlay={() => setIsPaused(false)}
    poster={
      selectedEpisode?.serie_image?.startsWith("http")
        ? selectedEpisode.serie_image
        : `${API_URL}/uploads/${selectedEpisode?.serie_image}`
    }
    className="w-full h-full object-contain"
  >
    <source src={selectedEpisode?.episode_video_link} type="video/mp4" />
  </video>

  {/* Overlay info when paused */}
  {selectedEpisode && (
    <div
      className={`absolute inset-0 bg-black/70 flex justify-center items-center transition-opacity duration-300 ${
        isPaused ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-white flex flex-col items-center p-6 text-center">
        <p className="text-gray-400 text-lg">YOU'RE WATCHING</p>
        <h1 className="font-bold text-3xl">{selectedEpisode.serie_name}</h1>
        <p className="text-xl mt-2">Episode {selectedEpisode.episode_number}</p>
        <p className="mt-4 max-w-[80%] mx-auto text-gray-300">{selectedEpisode.serie_description}</p>
      </div>
    </div>
  )}

  {/* Custom play/pause button */}
  <button
    onClick={() => {
      if (!videoRef.current) return;
      if (videoRef.current.paused) videoRef.current.play();
      else videoRef.current.pause();
    }}
    className="absolute inset-0 w-full h-full flex items-center justify-center"
  >
    {isPaused && (
      <i className="fa-solid fa-play text-white text-5xl md:text-7xl opacity-80"></i>
    )}
  </button>
</div>

    </section>
  );
}

export default CinemaSe;
