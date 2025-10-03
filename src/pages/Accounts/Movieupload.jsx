import React, {useEffect,useState} from 'react'
import Season from './Season';
import Episode from './Episode';

function Movieupload() {
      const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://new-movie-app.onrender.com/api";
    const [categoryname,setCategoryname] = useState("")
    const [categoryimage,setCategoryimage] = useState(null)
    const [categoryimageURL,setCategoryimageURL] = useState("")
    const [maincategory,setMaincategory] = useState("")
    const [categories,setCategories] = useState([]);
     const [message, setMessage] = useState("");
     const [uploadmovie,setUploadmovie]=useState("movie");
     const [movieposter,setMovieposter]=useState(null);
     const[moviename,setMoviename]=useState("")
     const[movielink,setMovielink]=useState("")
     const[moviedownloadlink,setMoviedownloadlink]=useState("")
     const[moviedescription,setMoviedescription]=useState("")
     const[movietrailerlink,setMovietrailerlink]=useState("")
     const[moviegenre,setMoviegenre]=useState("")
     const[moviecountry,setMoviecountry]=useState("")
     const[moviereleaseddate,setMoviereleaseddate]=useState("")
     const[moviecategory,setMoviecategory]=useState("")
     const[movieposterURL ,setMovieposterURL ] = useState("")


const uploadcategory = async (e) => {
  e.preventDefault();

  if ( !categoryname || !maincategory || (!categoryimage && !categoryimageURL)) {
    setMessage("All fields are required");
    return;
  }

  const formData = new FormData();
  formData.append("category_name", categoryname);
  formData.append("main_category", maincategory); // ✅ include main category
  if (categoryimage) {
    formData.append("category_image", categoryimage);
  } else if (categoryimageURL) {
    formData.append("categoryimageURL", categoryimageURL);
  }

  try {
    const res = await fetch(`${API_URL}/categories`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`Category "${data.category_name}" uploaded successfully!`);
      setCategoryname("");
      setCategoryimageURL("");
      setCategoryimage(null);
      setMaincategory("");
    } else {
      setMessage(data.error || "Failed to upload category");
    }
  } catch (err) {
    console.error("Error uploading category:", err);
    setMessage("Error uploading category");
  }
};
// --------uploading movie-----------
const Uploadmovie = async (e) => {
  e.preventDefault();

  if (!moviename || !moviedescription || (!movieposter && !movieposterURL)) {
    setMessage("Movie name, description, and poster are required");
    return;
  }

  const formData = new FormData();
  formData.append("movie_name", moviename);
  formData.append("movie_description", moviedescription);
  formData.append("movie_country", moviecountry);
  formData.append("movie_genre", moviegenre);
  formData.append("movie_released_date", moviereleaseddate);
  formData.append("movie_video_link", movielink);
  formData.append("movie_download_link", moviedownloadlink);
  formData.append("movie_trailer_link", movietrailerlink);
  formData.append("category_id", moviecategory);

  // Append either file or URL
  if (movieposter) {
    formData.append("movie_image", movieposter);
  } else if (movieposterURL) {
    formData.append("movieposterURL", movieposterURL);
  }

  try {
    const res = await fetch(`${API_URL}/movieupload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`Movie "${data.movie.movie_name}" uploaded successfully!`);

      // Reset all fields
      setMoviename("");
      setMoviedescription("");
      setMoviecountry("");
      setMoviegenre("");
      setMoviereleaseddate("");
      setMovielink("");
      setMoviedownloadlink("");
      setMovietrailerlink("");
      setMovieposter(null);
      setMovieposterURL("");
      setMoviecategory("");
    } else {
      setMessage(data.error || "Failed to upload movie");
    }
  } catch (err) {
    console.error("Error uploading movie:", err);
    setMessage("Error uploading movie");
  }
};



// --------fetching category---------
      useEffect(() => {
        // Fetch categories from backend
        fetch(`${API_URL}/categories`)
          .then((res) => res.json())
          .then((data) => setCategories(data))
          .catch((err) => console.error(err));
      }, []);

  return (
    <div >
        <div className='flex justify-center gap-7 font-semibold cursor-pointer'>
            <h1 onClick={() => setUploadmovie("movie")}>Upload Movie</h1>
            <h1 onClick={()=> setUploadmovie("episode")}>Upload Episodes</h1>
            <h1 onClick={()=> setUploadmovie("category")}>Upload Category</h1>
            <h1 onClick={()=> setUploadmovie("seasons")}>Upload seasons</h1>
        </div>
        {/* ------------------main upload system-------------------- */}
        {uploadmovie === 'movie' && (

                <div className='flex flex-col gap-4 items-center justify-center ' style={{padding:'10px'}}>
                <form onSubmit={Uploadmovie}  className='flex flex-col gap-4 items-center justify-center w-full md:w-[40%]' style={{padding:'10px', marginBottom:'5rem'}}>
                {/* <label className="block">
                <span className="text-sm font-medium text-gray-700">Upload Movie poster</span>
                <input 
                    type="file" 
                    onChange={(e) => setMovieposter(e.target.files[0])}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white file:mr-4 file:py-2 file:px-4
                            file:rounded file:border-0 file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700"
                />
                </label> */}
                {/* <input type="text" 
                value={movieposter}
                onChange={(e)=>setMovieposter(e.target.value)}
                placeholder='Movie  is movieposter'/> */}
                <label className="block w-full">
  <span className="text-sm font-medium text-gray-700">Movie Poster</span>

  {/* Option 1: File upload */}
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setMovieposter(e.target.files[0])} // file object
    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white file:mr-4 file:py-2 file:px-4
      file:rounded file:border-0 file:text-sm file:font-semibold
      file:bg-blue-600 file:text-white hover:file:bg-blue-700"
  />

  {/* Option 2: URL */}
  <input
    type="text"
    placeholder="Or enter image URL"
    value={movieposterURL || ""}
    onChange={(e) => setMovieposterURL(e.target.value)} // string URL
    className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md px-2 py-1"
  />
</label>

                <input type="text" 
                value={movielink}
                onChange={(e)=>setMovielink(e.target.value)}
                placeholder='Movie  is link'/>

                <input type="text" 
                    value={moviename}
                onChange={(e)=>setMoviename(e.target.value)}
                placeholder='Movie name'/>

                <textarea 
                value={moviedescription}
                onChange={(e)=>setMoviedescription(e.target.value)}
                placeholder='movie description'></textarea>
                <input type="text" 
                value={movietrailerlink}
                onChange={(e)=>setMovietrailerlink(e.target.value)}
                placeholder='movie trailer link' />
                <input type="text" 
                value={moviedownloadlink}
                onChange={(e)=>setMoviedownloadlink(e.target.value)}
                placeholder='movie download link' />
                <input type="text"
                value={moviegenre}
                onChange={(e)=>setMoviegenre(e.target.value)}
                placeholder='movie genre: action/drama ..' />
                <input type="text"
                value={moviecountry}
                onChange={(e)=>setMoviecountry(e.target.value)}
                placeholder='Movie country' />
                <input type="date"
                value={moviereleaseddate}
                onChange={(e)=>setMoviereleaseddate(e.target.value)}
                placeholder='Relseasd date' />
                {/* <select name="category_id" className="border-2 border-gray-500 rounded-[10px] h-[2.5rem] w-full  placeholder-black" required>
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                </option>
                ))}
            </select> */}
            <select
            name="category_id"
            className="border-2 border-gray-500 rounded-[10px] h-[2.5rem] w-full placeholder-black"
            value={moviecategory}                // bind state
            onChange={(e) => setMoviecategory(e.target.value)} // update state
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>

                <button className=' bg-[green] rounded-[10px]' style={{padding:'5px 15px'}}>Upload</button>
                </form>
            </div>
        )}

            {/* -----------------------upload movie sub category------------ */}
            {uploadmovie === "category" && (

            <div className='flex justify-center w-full ' style={{padding:'10px', height:'100vh'}}>
            <form onSubmit={uploadcategory} className='flex flex-col gap-4 w-1/2'>
                    <input 
                    onChange={(e) => setCategoryimage(e.target.files[0])}
                    type="file" 
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white file:mr-4 file:py-2 file:px-4
                            file:rounded file:border-0 file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700"
                />
                <input type="text"
                value={categoryimageURL || ""}
                onChange={(e)=>setCategoryimageURL(e.target.value)}
                placeholder='category image link' />
                <input type="text"
                value={categoryname}
                onChange={(e)=>setCategoryname(e.target.value)}
                placeholder='category name' />
                <select className='border rounded w-full h-[3rem] '
                value={maincategory}
                onChange={(e)=>setMaincategory(e.target.value)}
                >
                    <option value="">-- Select Category --</option>
                    <option value="agasobanuye">agasobanuye</option>
                    <option value="izidasobanuye">izidasobanuye</option>
                </select>
                <button type='submit' className=' bg-[green] rounded-[10px]' style={{padding:'5px 15px'}}>Upload</button>

            </form>

            </div>
            )}
            {/* -----------------------upload season--------------/ */}
            {uploadmovie === "seasons" && (
              <Season/>
            )}
                        {/* -----------------------upload episode--------------/ */}
            {uploadmovie === "episode" && (
              <Episode/>
            )}
    </div>
  )
}

export default Movieupload