import React, { useState, useEffect } from 'react';
import './AllEpisodes.css'; // optional if you want custom styling

function AllEpisodes() {
  const [viewmovie, setViewmovie] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [episodenumber, setEpisodenumber] = useState('');
  const [episodevideolink, setEpisodevideolink] = useState('');
  const [episodedownloadlink, setEpisodedownloadlink] = useState('');
  const [episodecountry, setEpisodecountry] = useState('');
  const [episodedate, setEpisodedate] = useState('');

  const API_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://new-movie-app.onrender.com';

  // ---------- Fetch all episodes ----------
  useEffect(() => {
    fetch(`${API_URL}/api/episodes`)
      .then((res) => res.json())
      .then((data) => setEpisodes(data))
      .catch((err) => console.error(err));
  }, []);

  // ---------- Delete episode ----------
  const deleteEpisode = (episodeid) => {
    fetch(`${API_URL}/api/episode/${episodeid}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.episode) {
          alert('Episode deleted successfully');
          setEpisodes(episodes.filter((episode) => episode.episode_id !== episodeid));
          setViewmovie(false);
        } else {
          alert('Failed to delete episode: ' + data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong.');
      });
  };

  // ---------- Save (PATCH) episode ----------
  const updateEpisode = () => {
    if (!selectedMovie) return;

    const updatedData = {
      episode_number: episodenumber,
      episode_video_link: episodevideolink,
      episode_download_link: episodedownloadlink,
      episode_country: episodecountry,
      episode_released_date: episodedate,
    };

    fetch(`${API_URL}/api/episode/${selectedMovie.episode_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Episode updated successfully!');
          // Update local state
          setEpisodes((prev) =>
            prev.map((ep) =>
              ep.episode_id === selectedMovie.episode_id ? data.episode : ep
            )
          );
          setEditMode(false);
          setViewmovie(false);
        } else {
          alert('Update failed: ' + data.message);
        }
      })
      .catch((err) => {
        console.error('Update error:', err);
        alert('Something went wrong while updating.');
      });
  };

  return (
    <div className="p-4">
      {/* ---------- Episodes Grid ---------- */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 cursor-pointer">
        {episodes.map((episode) => (
          <div
            key={episode.episode_id}
            className="cursor-pointer"
            onClick={() => {
              setSelectedMovie(episode);
              setViewmovie(true);
            }}
          >
            <img
              src={
                episode.serie_image
                  ? episode.serie_image.startsWith('http')
                    ? episode.serie_image
                    : `${API_URL}/uploads/${episode.serie_image}`
                  : 'https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg'
              }
              alt={episode.serie_name}
              className="w-[100px] md:w-[190px] rounded-[10px] md:h-[75%]"
              loading="lazy"
            />
            <div>
              <p className="font-medium">{episode.serie_name}</p>
              <p className="text-[#929292] ">Episode {episode.episode_number}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Movie Modal ---------- */}
      {viewmovie && selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => {
              setViewmovie(false);
              setSelectedMovie(null);
              setEditMode(false);
            }}
          ></div>

          <div className="bg-white w-full md:w-[80%] h-full md:h-fit p-4 rounded-lg relative z-10 overflow-y-scroll">
            <i
              className="fa-solid fa-xmark absolute right-5 top-5 text-[20px] cursor-pointer"
              onClick={() => {
                setViewmovie(false);
                setSelectedMovie(null);
                setEditMode(false);
              }}
            ></i>

            {!editMode ? (
              <>
                <h1 className="text-center font-semibold text-[20px]">
                  {selectedMovie.serie_name}
                </h1>
                <div className="flex flex-wrap items-start gap-4 mb-4 mt-4">
                  <img
                    src={
                      selectedMovie.serie_image
                        ? selectedMovie.serie_image.startsWith('http')
                          ? selectedMovie.serie_image
                          : `${API_URL}/uploads/${selectedMovie.serie_image}`
                        : 'https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg'
                    }
                    alt={selectedMovie.serie_name}
                    className="w-45 h-60 rounded-[10px]"
                  />
                  <div>
                    <p>
                      <strong>Genre:</strong> {selectedMovie.serie_genre}
                    </p>
                    <p>
                      <strong>Episode:</strong> {selectedMovie.episode_number}
                    </p>
                    <p>
                      <strong>Country:</strong>{' '}
                      {selectedMovie.episode_country || 'Unknown'}
                    </p>
                    <p>
                      <strong>Download Link:</strong>{' '}
                      <span className="text-blue-600">
                        {selectedMovie.episode_download_link || 'N/A'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end mt-3">
                  <i
                    className="fa-solid fa-trash text-red-600 cursor-pointer text-[20px]"
                    title="Delete"
                    onClick={() => deleteEpisode(selectedMovie.episode_id)}
                  ></i>
                  <i
                    className="fa-solid fa-pen-to-square text-green-600 cursor-pointer text-[20px]"
                    title="Edit"
                    onClick={() => {
                      setEditMode(true);
                      setEpisodenumber(selectedMovie.episode_number);
                      setEpisodevideolink(selectedMovie.episode_video_link);
                      setEpisodedownloadlink(selectedMovie.episode_download_link);
                      setEpisodecountry(selectedMovie.episode_country);
                      setEpisodedate(
                        selectedMovie.episode_released_date
                          ? new Date(selectedMovie.episode_released_date)
                              .toISOString()
                              .slice(0, 10)
                          : ''
                      );
                    }}
                  ></i>
                </div>
              </>
            ) : (
              <>
                {/* ---------- Edit Form ---------- */}
                <h1 className="text-center font-semibold text-[20px] mb-4">
                  Edit Episode
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={episodenumber}
                    onChange={(e) => setEpisodenumber(e.target.value)}
                    placeholder="Episode Number"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    value={episodevideolink}
                    onChange={(e) => setEpisodevideolink(e.target.value)}
                    placeholder="Video Link"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    value={episodedownloadlink}
                    onChange={(e) => setEpisodedownloadlink(e.target.value)}
                    placeholder="Download Link"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    value={episodecountry}
                    onChange={(e) => setEpisodecountry(e.target.value)}
                    placeholder="Country"
                    className="border p-2 rounded"
                  />
                  <input
                    type="date"
                    value={episodedate}
                    onChange={(e) => setEpisodedate(e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-5">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={updateEpisode}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllEpisodes;
