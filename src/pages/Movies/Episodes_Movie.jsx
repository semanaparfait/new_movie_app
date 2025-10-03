import React,{useState,useEffect} from 'react'

function Episodes_Movie() {
    const [episodes, setEpisodes] = useState([]);
              const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://new-movie-app.onrender.com/api";
    useEffect(()=>{
        fetch(`${API_URL}/episodes`,{method:"GET"})
        .then(res => res.json())
        .then(data => setEpisodes(data))
        .catch(err => console.error("erro trying to fetch",err))
    },[])
  return (
            <div className="overflow-x-auto px-4">

                        <table className="recent-table w-full text-sm md:text-base">
                            <thead className="bg-gray-100 ">
                            <tr>
                                <th>Episode id</th>
                                <th>SeasonID</th>
                                <th>Episode</th>
                                <th> description</th>
                                <th> trailer</th>
                                <th> released date</th>
                                <th>created at</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                                {episodes.map((episode)=>(

                                <tr key={episode.episode_id}>
                                    <td className='flex gap-3'>
                                    <img
                                    src={
                                    episode.serie_image
                                    ? episode.serie_image.startsWith('http')
                                    ? episode.serie_image // full URL, use as is
                                    : `${API_URL}/uploads/${episode.serie_image}` // uploaded file, prepend API path
                                    : '/https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg' // optional fallback if no image
                                } alt={episode.serie_name} className="w-14 h-19 rounded-[10px]"
                                loading='lazy' />
                                        <div className='flex flex-col'>

                                        <td>{episode.serie_name}</td> 
                                        <div className='flex'>
                                        <td>S {episode.serie_number}</td> 
                                        <td>Ep {episode.episode_number}</td> 
                                        </div>
                                        <td>{episode.serie_genre}</td> 
                                        <td>{episode.provider}  </td> 
                                        <td>{episode.episode_country}</td> 
                                        </div>
                                    </td>
                                    <td>{episode.serie_description}</td> 
                                    <td>{episode.episode_download_link}</td> 
                                    <td>{episode.serie_trailer_link}</td> 
                                    <td>{episode.episode_released_date}</td> 
                                    <td>{episode.serie_released_date}</td> 
                                    <td>{episode.created_at}</td> 
                                </tr>
                                ))}
                               
                            </tbody>
                        </table>
                        </div>
  )
}

export default Episodes_Movie