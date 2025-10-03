import React, {useState,useEffect} from 'react'

function Episode() {
  const [seasonselection, setSeasonselection] = useState([])
  const [episodenumber,setEpisodenumber] = useState('')
  const [episodevideolink,setEpisodevideolink] = useState("")
  const [episodedownloadlink,setEpisodedownloadlink] = useState("")
  const [episodecountry, setEpisodecountry] = useState("")
  const [seasons , setSeasons] = useState('')
  const [episoderelseaddate, setEpisoderelseaddate ] = useState('')
  const [message, setMessage] = useState("");
            const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://new-movie-app.onrender.com/api";
  useEffect(()=>{
    fetch(`${API_URL}/seasons`,{
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => setSeasonselection(data))
    .catch(err => console.error('error fetching seasons to be used on epesidos', err))

  },[])

const uploadepisode = async (e) => {
  e.preventDefault();

  if (!seasons || !episodevideolink || !episodenumber) {
    setMessage("All fields are required");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/episodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // send as JSON
      },
      body: JSON.stringify({
        serie_id: seasons,
        episode_number: episodenumber,
        episode_video_link: episodevideolink,
        episode_download_link: episodedownloadlink,
        episode_country: episodecountry,
        episode_released_date: episoderelseaddate,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`Episode ${data.episode_number} uploaded successfully!`);
      setSeasons("");
      setEpisodenumber("");
      setEpisodevideolink("");
      setEpisodedownloadlink("");
      setEpisodecountry("");
      setEpisoderelseaddate("");
    } else {
      setMessage(data.error || "Failed to upload episode");
    }
  } catch (err) {
    console.error("Error uploading episodes:", err);
    setMessage("Error uploading episodes");
  }
};

  return (
    <div>
        <div className='flex flex-col gap-4 items-center justify-center ' style={{padding:'10px'}}>
                <form onSubmit={uploadepisode}  className='flex flex-col gap-4 items-center justify-center w-full md:w-[40%]' style={{padding:'10px', marginBottom:'5rem'}}>

                <input type="number" 
                value={episodenumber}
                onChange={(e)=>setEpisodenumber(e.target.value)}
                placeholder='Episode number'
                className='border h-[2.6rem] rounded-[15px] w-full' style={{padding:'0px 10px'}}/>
                <input type="text" 
                value={episodevideolink}
                onChange={(e)=>setEpisodevideolink(e.target.value)}
                placeholder='Episode video link'/>
                <input type="text" 
                value={episodedownloadlink}
                onChange={(e)=>setEpisodedownloadlink(e.target.value)}
                placeholder='Episode download link' />
                <input type="text"
                value={episodecountry}
                onChange={(e)=>setEpisodecountry(e.target.value)}
                placeholder='episode country' />
                <select
                value={seasons}
                onChange={(e)=>setSeasons(e.target.value)}
                required
                className="border-2 border-gray-500 rounded-[10px] h-[2.5rem] w-full placeholder-black">
                  <option value=""> select season --</option>
                  {seasonselection.map((season)=>(
                    <option key={season.serie_id} value={season.serie_id}>{season.serie_name}</option>
                  ))}
                  
                </select>
                <input type="date"
                value={episoderelseaddate}
                onChange={(e)=>setEpisoderelseaddate(e.target.value)}
                placeholder='episode  Relseasd date' />


                <button className=' bg-yellow-300 rounded-[10px]' style={{padding:'5px 15px'}}>Upload Episode</button>
                </form>
            </div>
    </div>
  )
}

export default Episode