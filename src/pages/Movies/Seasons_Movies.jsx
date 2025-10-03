import React,{useEffect,useState} from 'react'

function Seasons_Movies() {
    const [seasons, setSeasons] = useState([])
                const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://new-movie-app.onrender.com";
    useEffect(()=>{
        fetch(`${API_URL}/api/seasons`,{
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => setSeasons(data))
        .catch(err => console.error('error fetching seasons', err))
    },[])
    
  return (
        <div className="overflow-x-auto px-4">

                        <table className="recent-table w-full text-sm md:text-base">
                            <thead className="bg-gray-100 ">
                            <tr>
                                <th>SeasonID</th>
                                <th>season</th>
                                <th> description</th>
                                <th> trailer</th>
                                <th> released date</th>
                                <th>created at</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                                {seasons.map((season)=>(
                                    <tr key={season.serie_id}>
                                        <td>{season.serie_id}</td>
                                        <td className='flex items-center gap-3'>
                                        <img
                                    src={
                                    season.serie_image
                                    ? season.serie_image.startsWith('http')
                                    ? season.serie_image // full URL, use as is
                                    : `${API_URL}/uploads/${season.serie_image}` // uploaded file, prepend API path
                                    : '/https://i.pinimg.com/1200x/c8/e6/e9/c8e6e97dba3541c0d0fa97b23a166019.jpg' // optional fallback if no image
                                } alt={season.serie_name} className="w-14 h-19 rounded-[10px]"
                                loading='lazy' />
                                            <div className=' flex flex-col '>
                                                <td>{season.serie_name}</td>
                                                <td>Season {season.serie_number}</td>
                                                <td>{season.serie_genre}</td>
                                            </div>
                                        </td>
                                                <td>{season.serie_description}</td>
                                                <td>{season.serie_trailer_link}</td>
                                                <td>{season.serie_released_date}</td>
                                                <td>{season.created_at}</td>
                                                <td title='delete' ><i className="fa-solid fa-trash text-red-600 cursor-pointer"></i></td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
  )
}

export default Seasons_Movies