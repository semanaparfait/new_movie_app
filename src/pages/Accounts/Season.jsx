import React,{useEffect,useState} from 'react'

function Season() {
          const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://new-movie-app.onrender.com/api";
    const [seasonimage,setSeasonimage] = useState("")
    const [seasonimagelink,setSeasonimagelink] = useState("")
    const [seasonname,setSeasonname] = useState("")
    const [seasonumber,setSeasonumber] = useState("")
    const [seasondescription,setSeasondescription] = useState("")
    const [seasontrailerlink,setSeasontrailerlink] = useState("")
    const [seasondate,setSeasondate] = useState("")
    const [seasongenre,setSeasongenre] = useState("")
    const [message, setMessage] = useState("");
    const [serieproviders,setSerieproviders] = useState([])
    const [seasonsproviderchoice,setSeasonproviderchoice] = useState("")


    useEffect(()=>{
        fetch(`${API_URL}/categories`,{method:'GET'})
        .then(res=>res.json())
        .then(data => setSerieproviders(data))
        .catch(err => console.error('error fetching movies ',err))
    },[])

const uploadSeason = async (e) => {
  e.preventDefault();

  if ( !seasonname || !seasondescription || (!seasonimage && !seasonimagelink) || !seasonsproviderchoice) {
    setMessage("All fields are required");
    return;
  }

  const formData = new FormData();
    formData.append("season_name", seasonname);
    formData.append("season_description", seasondescription);
    formData.append("season_trailer_link", seasontrailerlink);
    formData.append("season_genre", seasongenre);
    formData.append("season_date", seasondate);
    formData.append("season_number",seasonumber);
    formData.append("season_provider_choice",seasonsproviderchoice);
  if (seasonimage) {
    formData.append("season_image", seasonimage);
  } else if (seasonimagelink) {
    formData.append("season_imagelink", seasonimagelink);
  }

  try {
    const res = await fetch(`${API_URL}/seasons`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`season "${data.season_name}" uploaded successfully!`);
      setSeasonname("");
      setSeasonimagelink("");
      setSeasonimage(null);
      setSeasondescription("");
      setSeasongenre("");
      setSeasonumber("");
      setSeasontrailerlink("");
      setSeasonproviderchoice("");
    } else {
      setMessage(data.error || "Failed to upload category");
    }
  } catch (err) {
    console.error("Error uploading category:", err);
    setMessage("Error uploading category");
  }
};
  return (
    <div>
        <div className='flex flex-col gap-4 items-center justify-center ' style={{padding:'10px'}}>
                <form onSubmit={uploadSeason}  className='flex flex-col gap-4 items-center justify-center w-full md:w-[40%]' style={{padding:'10px', marginBottom:'5rem'}}>
                
                <label className="block w-full">
                <span className="text-sm font-medium text-gray-700">Season Poster</span>

                {/* Option 1: File upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e)=>setSeasonimage(e.target.files[0])}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />

                {/* Option 2: URL */}
                <input
                    type="text"
                    value={seasonimagelink}
                    onChange={(e)=>setSeasonimagelink(e.target.value)}
                    placeholder="Or enter image URL"
                    className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md px-2 py-1"
                />
            </label>

                <input type="text" 
                value={seasonname}
                onChange={(e)=>setSeasonname(e.target.value)}
                placeholder='Season name'/>
                <input type="number" 
                value={seasonumber}
                onChange={(e)=>setSeasonumber(e.target.value)}
                placeholder='Season number'
                className='border h-[2.6rem] rounded-[15px] w-full' style={{padding:'0px 10px'}}/>
                <textarea 
                value={seasondescription}
                onChange={(e)=>setSeasondescription(e.target.value)}
                placeholder='Season description'></textarea>
                <input type="text" 
                value={seasontrailerlink}
                onChange={(e)=>setSeasontrailerlink(e.target.value)}
                placeholder='Season trailer link' />
                <input type="text"
                value={seasongenre}
                onChange={(e)=>setSeasongenre(e.target.value)}
                placeholder='Season genre: action/drama ..' />
                <select 
                value={seasonsproviderchoice}
                onChange={(e)=>setSeasonproviderchoice(e.target.value)}
                className="border-2 border-gray-500 rounded-[10px] h-[2.5rem] w-full placeholder-black"
                >
                  <option value="">select season provider --</option>
                  {serieproviders.map((serieprovider)=>(

                  <option key={serieprovider.category_id} value={serieprovider.category_id}>
                    {serieprovider.category_name}
                  </option>
                  ))}
                </select>
                <input type="date"
                value={seasondate}
                onChange={(e)=>setSeasondate(e.target.value)}
                placeholder='Relseasd date' />


                <button className=' bg-[green] rounded-[10px]' style={{padding:'5px 15px'}}>Upload</button>
                </form>
            </div>
    </div>
  )
}

export default Season