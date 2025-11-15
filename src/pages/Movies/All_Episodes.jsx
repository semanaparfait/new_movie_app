import React,{useState,useEffect, lazy} from 'react'
import Seasons_Movies from './Seasons_Movies';
import Episodes_Movie from './Episodes_Movie';

function AllEpisodes() {
  const [activeTab, setActiveTab] = useState("movies")
  const [viewmovie, setViewmovie] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
    const [editMode, setEditMode] = useState(false);
  const [serieid, setSerieid]=useState("")
  const [seriename,setSeriename] = useState("")
  const [serienumber,setSerienumber] = useState("")
  const [serieimage,setSerieimage] = useState("")
  const [serietrailer,setSerietrailer] = useState("")
  const [seriedescription,setSeriedescription] = useState("")
  const [seriedate,setSeriedate]  = useState("")
  const [seriegenre,setSeriegenre]=useState("")
  const [episodeid,setEpisodeid] = useState("")
  const [episodenumber,setEpisodenumber]= useState("")
  const [episodevideolink,setEpisodevideolink] = useState("")
  const [episodedownloadlink,setEpisodedownloadlink] = useState("")
  const [episodedate,setEpisodedate]= useState("")
  const [episodecountry,setEpisodecountry] = useState("")

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
  // ---------- Save (PATCH) episode ----------
  const updateEpisode = () => {
    if (!selectedMovie) return;

    const updatedData = {
      episode_number: episodenumber,
      episode_video_link: episodevideolink,
      episode_download_link: episodedownloadlink,
      episode_country: episodecountry,
      episode_released_date: episodedate,
      serie_genre:seriegenre,
      serie_name:seriename,
      serie_number:serienumber,
      serie_description:seriedescription,
      serie_image:serieimage,
      serie_trailer_link:serietrailer,
      serie_released_date:seriedate
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
                      <p className="text-[#929292] ">
                      Season {episode.serie_number}
                    </p>
                  </div>
        </div>
      ))}
        </div>
{viewmovie && selectedMovie && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* backdrop */}
    <div
      className="absolute inset-0 bg-black opacity-40"
      onClick={() => {
        setViewmovie(false);
        setSelectedMovie(null);
      }}
    ></div>

    <div className="movie-details bg-white w-full md:w-[80%] h-full md:h-fit p-4 rounded-lg relative z-10 overflow-y-scroll" style={{padding:'10px'}}>
      <h1 className="text-center font-semibold text-[20px]">
        {selectedMovie.serie_name}
      </h1>
      <i
        className="fa-solid fa-xmark absolute right-5 top-5 text-[20px] cursor-pointer"
        onClick={() => {
          setViewmovie(false);
          setSelectedMovie(null);
        }}
      ></i>

      {!editMode ? (
        <>
          {/* ---------- View Mode ---------- */}
          <div className="flex flex-wrap items-start gap-4 py-2 px-2">
            <img
              src={
                selectedMovie.serie_image
                  ? selectedMovie.serie_image.startsWith("http")
                    ? selectedMovie.serie_image
                    : `${API_URL}/uploads/${selectedMovie.serie_image}`
                  : "https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg"
              }
              alt={selectedMovie.movie_name}
              className="w-45 h-60 rounded-[10px] "
            />
            <div>
              <div className="flex items-center gap-10 flex-wrap">
                <div>
                  <label className="font-semibold">Name :</label>
                  <h1>{selectedMovie.serie_name}</h1>
                  <label className="font-semibold">Genre :</label>
                  <h1>{selectedMovie.serie_genre}</h1>
                  <label className="font-semibold">Episode :</label>
                  <h1>Episode {selectedMovie.episode_number}</h1>
                </div>

                <div>
                  <label className='font-semibold'>Season :</label>
                  <h1>Season {selectedMovie.serie_number}</h1>
                  <label className="font-semibold">Country:</label>
                  <h1>{selectedMovie.episode_country || "Unknown"}</h1>
                  <label className="font-semibold">Provider: </label>
                  <h1>
                    {selectedMovie.provider_name ||
                      selectedMovie.category_name ||
                      "Unknown"}
                  </h1>
                </div>
              </div>
              <br />
              <label className="font-semibold">Trailer Link:</label>
              <p className="text-blue-600 underline break-words whitespace-normal">
                {selectedMovie.serie_trailer_link || "N/A"}
              </p>
              <label className="font-semibold">Download Link:</label>
              <p className="text-blue-600 underline break-words whitespace-normal">
                {selectedMovie.episode_download_link || "N/A"}
              </p>
            </div>
          </div>
          <p>{selectedMovie.serie_description || "No description available."}</p>
          <br />
          <div className="flex gap-1.5 justify-end">
            <i
              className="fa-solid fa-trash text-red-600 cursor-pointer text-[20px]"
              title="delete"
              onClick={() => deletMovie(selectedMovie.episode_id)}
            ></i>
            <i
              className="fa-solid fa-pen-to-square text-green-600 cursor-pointer text-[20px]"
              title="Edit"
              onClick={() => {
                setEditMode(true); // ✅ fixed
                setSerieid(selectedMovie.serie_id);
                setSeriename(selectedMovie.serie_name);
                setSerienumber(selectedMovie.serie_number);
                setSerieimage(selectedMovie.serie_image);
                setSerietrailer(selectedMovie.serie_trailer_link);
                setSeriedescription(selectedMovie.serie_description);
                setSeriedate(
                  selectedMovie.serie_released_date
                    ? new Date(
                        selectedMovie.serie_released_date
                      )
                        .toISOString()
                        .slice(0, 10)
                    : ""
                );
                setSeriegenre(selectedMovie.serie_genre);
                setEpisodeid(selectedMovie.episode_id);
                setEpisodenumber(selectedMovie.episode_number);
                setEpisodevideolink(selectedMovie.episode_video_link);
                setEpisodedownloadlink(
                  selectedMovie.episode_download_link
                );
                setEpisodedate(
                  selectedMovie.episode_released_date
                    ? new Date(
                        selectedMovie.episode_released_date
                      )
                        .toISOString()
                        .slice(0, 10)
                    : ""
                );
                setEpisodecountry(selectedMovie.episode_country);
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
          <div className=" overflow-y-scroll" style={{padding:'10px'}}>
            <div className='grid md:grid-cols-3 gap-1.5 items-center ' style={{padding:'10px'}}>

            <div className='flex flex-col'>

            <label className='font-semibold'>Ep Number</label>
            <input
              type="number"
              value={episodenumber}
              onChange={(e) => setEpisodenumber(e.target.value)}
              placeholder="Episode Number"
              className="border p-2 rounded h-[2rem]"
              />
            </div>
           <div className='flex flex-col'>

            <label className='font-semibold'>Season Number</label>
            <input
              type="number"
              value={serienumber}
              onChange={(e) => setSerienumber(e.target.value)}
              placeholder="Episode Number"
              className="border p-2 rounded h-[2rem]"
            />
            </div>
           <div className='flex flex-col'>
            <label className='font-semibold'>Season Name</label>
            <input
              type="text"
              value={seriename}
              onChange={(e) => setSeriename(e.target.value)}
              placeholder="season namer"
              className="border  rounded h-[2rem]"
            />

            </div>
           <div className='flex flex-col'>
            <label className='font-semibold'>Season Genre</label>
            <input
              type="text"
              value={seriegenre}
              onChange={(e) => seriegenre(e.target.value)}
              placeholder="serie genre"
              className="border  rounded h-[2rem]"
              />

            </div>
           <div className='flex flex-col'>

            <label className='font-semibold'>Ep Number</label>
            <input
              type="number"
              value={episodenumber}
              onChange={(e) => setEpisodenumber(e.target.value)}
              placeholder="Episode Number"
              className="border p-2 rounded h-[2rem]"
              />
            </div>
           <div className='flex flex-col'>

            <label className='font-semibold'>Ep country</label>
            <input
              type="text"
              value={episodecountry}
              onChange={(e) => setEpisodecountry(e.target.value)}
              placeholder="Country"
              className="border  rounded h-[4rem]"
              />
            </div>
           <div className='flex flex-col'>

            <label className='font-semibold'>Ep date</label>
            <input
              type="date"
              value={episodedate}
              onChange={(e) => setEpisodedate(e.target.value)}
              className="border p-2 rounded h-[2rem]"
              />
              </div>
              <div className='flex flex-col'>
              <label className='font-semibold'>season image</label>
            <input
              type="text"
              value={serieimage}
              onChange={(e) => setSerieimage(e.target.value)}
              className="border p-2 rounded h-[2rem]"
              />

              </div>

              </div>
            <label className='font-semibold'>Ep video link</label>
            <input
              type="text"
              value={episodevideolink}
              onChange={(e) => setEpisodevideolink(e.target.value)}
              placeholder="Video Link"
              className="border p-2 rounded"
            />
            <label className='font-semibold'>Ep download link</label>
            <input
              type="text"
              value={episodedownloadlink}
              onChange={(e) => setEpisodedownloadlink(e.target.value)}
              placeholder="Download Link"
              className="border p-2 rounded"
            />
          </div><br />

          <div className="flex justify-end gap-3 mt-5">
            <button
              className="bg-gray-400 text-white  rounded"
              onClick={() => setEditMode(false)}
              style={{padding:'6px 20px'}}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 text-white rounded"
              onClick={updateEpisode}
              style={{padding:'6px 20px'}}
            >
              Save Changes
            </button>
          </div><br />
        </>
      )}
    </div>
  </div>
)}


      </div>
  )
}

export default AllEpisodes