import React,{useState,useEffect, lazy} from 'react'
import { Link } from 'react-router-dom'

function Categories() {
                    const API_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://new-movie-app.onrender.com";
            const[categories, setCategories] = useState([])
            useEffect( ()=>{
        fetch(`${API_URL}/api/categories`, { method: "GET", credentials: "include" })
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch((err) => console.error(err));
      },[])
const deleteCategory = (id) => {
  fetch(`${API_URL}/api/categories/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      if (data.category) {
        alert("Category deleted successfully");
        setCategories(categories.filter(category => category.category_id !== id));
        } else {
        alert("Failed to delete category: " + data.message);
        }
    })
    .catch((err) => {
      console.error(err);
      alert("Something went wrong.");
    });
};

  return (
    <div className='w-full h-full bg-white '>
        <h2 className='font-bold text-2xl text-center'>Categories Page</h2>
        <div className="overflow-x-auto px-4">

        <table className="recent-table w-full text-sm md:text-base">
            <thead className="bg-gray-100 ">
                <tr>

                <th>Id</th>
                <th>created_at</th>
                <th>category_name</th>
                <th>category_image</th>
                <th>main category</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                
                    {categories.map((category)=>(
                        <tr key={category.category_id}>
                            <td>{category.category_id}</td>
                            <td>{category.created_at}</td>
                            <td>{category.category_name}</td>
                            <td>                <img
                  src={
                    category.category_image?.startsWith("http")
                      ? category.category_image // use URL directly
                      : `${API_URL}/uploads/${category.category_image}` // use backend file
                  }
                  alt={category.category_name}
                  className='w-20 h-20 object-cover '
                  loading="lazy"
                  decoding="async"
                /></td>
                            {/* <td><img src={`${API_URL}/uploads/${category.category_image}`} alt={category.category_name} className='w-20 h-20 object-cover ' loading='lazy'/></td> */}
                            <td >{category.main_category}</td>
                            <td title='delete' onClick={() => deleteCategory(category.category_id)}><i className="fa-solid fa-trash text-red-600 cursor-pointer"></i></td>
                        </tr>
                    ))}
                
            </tbody>
        </table>
        </div>

    </div>
  )
}

export default Categories