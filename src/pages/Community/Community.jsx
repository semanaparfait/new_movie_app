import React, { useState, useEffect } from "react";
// Make sure this path is correct for your project structure
import community from "../../assets/images/community/community1.png";
import Navbar from "../../components/Navbar/Navbar"

function Community() {
  // Predefined testimonial messages
const messages = [
  {
    Image: "https://i.pinimg.com/736x/18/12/00/1812007bdc4f2b4d84ca0efd2882aa3d.jpg",
    name: "BISANGWA Ally Faith",
    message: "I love how easy it is to find my favorite movies here. Amazing platform!",
  },
  {
    Image: "https://i.pinimg.com/736x/d5/af/cf/d5afcfcbf9550887f02cfd9f88352984.jpg",
    name: "Christian Reganante",
    message: "The movie collection is huge, and the site is very user-friendly! best in the best",
  },
  {
    Image: "https://i.pinimg.com/736x/d4/3c/19/d43c19b9fdb4f555a7939dafe0f7fc48.jpg",
    name: "NTWALI David",
    message: "I found some rare movies here that I couldn’t find anywhere else. Love it!",
  },
];


  // --- STATE MANAGEMENT ---

  // 1. FIXED: Initialize comments directly from LocalStorage to prevent data loss
  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem("comments");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [comment_mssg, setComment_mssg] = useState("");

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  // --- EFFECTS ---

  // 2. Fetch logged-in user info
  useEffect(() => {
    fetch(`${API_URL}/api/me`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.id) {
          setIsLoggedin(true);
          setUser(data);
        } else {
          setIsLoggedin(false);
          setUser(null);
        }
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, [API_URL]);

  // 3. Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // --- HANDLERS ---

  const PostComment = () => {
    if (!comment_mssg.trim()) return; // Prevent empty comments

    const date = new Date();
    // Using toLocaleDateString is cleaner for formatting
    const formattedDate = date.toLocaleDateString('en-GB'); // dd/mm/yyyy format

    const newComment = {
      message: comment_mssg,
      username: user?.username || "Guest",
      // Random avatar generator
      avatar: `https://api.dicebear.com/9.x/micah/svg/${Math.floor(Math.random() * 1000)}.svg`,
      date: formattedDate,
    };

    setComments([...comments, newComment]);
    setComment_mssg(""); 
  };

  return (
    <main style={{padding:'12px'}}>
      <Navbar />
      {/* Header Image */}
      <div className="flex justify-center mb-6">
        <img src={community} alt="community logo" className="max-w-full h-auto" />
      </div>

      {/* Testimonials Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
        <div className="md:w-1/2 p-6 rounded-xl text-left">
          <h1 className="text-2xl md:text-3xl font-bold " style={{paddingBottom:'15px'}}>
            What Our <br /> Customers Say
          </h1>
          <p >
            Our clients are at the heart of everything we do. Their
            experiences, feedback, and success stories help us grow and serve
            better every day.
          </p>
          <button
          style={{padding:'7px 15px'}}
          className="bg-amber-700 hover:bg-amber-800 text-white cursor-pointer rounded-lg text-sm mx-auto block transition-colors">
            View More
          </button>
        </div>

        {/* Predefined Messages Loop */}
        <div className="flex flex-col gap-4 md:w-1/2">
          {messages.map((message, index) => (
            <div
              key={index}
              style={{padding:'6px 15px'}}
              className="flex gap-3 bg-white text-black md:w-4/5 rounded-xl items-center shadow-sm border border-gray-100 "
            >
              <img
                src={message.Image}
                alt={message.name}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div>
                <h1 className="font-semibold text-lg">{message.name}</h1>
                <p className="text-sm text-gray-600">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comment Input Section */}
      <div className="mt-8 max-w-4xl mx-auto">
        <h1 className="font-semibold text-4xl mb-2">Comment</h1>
        <h2 className="font-semibold text-amber-700 mb-2 text-lg">
          {user?.username?.toUpperCase() || "GUEST"}
        </h2>
        
        <div className="flex flex-col items-start gap-3">
          <textarea
            placeholder="Enter Your Comment"
            style={{padding:'10px'}}
            className="border border-gray-300 resize-none rounded-lg w-full md:w-1/2 h-28  focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
            value={comment_mssg}
            onChange={(e) => setComment_mssg(e.target.value)}
          ></textarea>
          
          <button
          style={{padding:'7px 15px'}}
            className="bg-green-700 hover:bg-green-800 text-white text-sm rounded-lg cursor-pointer  transition-colors flex items-center gap-2"
            onClick={PostComment}
          >
            Send Message <i className="fa-solid fa-comment"></i>
          </button><br />
        </div>
      </div>

      {/* User Comments List */}
      <div className="flex flex-col gap-6 mt-10 max-w-4xl mx-auto">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex gap-3 border-b border-gray-100 pb-4">
              <img
                src={comment.avatar}
                alt={comment.username}
                className="rounded-full w-12 h-12 object-cover bg-gray-200"
              />
              <div>
                <div className="f items-baseline gap-2">
                  <h1 className="font-semibold ">{comment.username}</h1>
                  <span className="text-xs text-gray-500">{comment.date}</span>
                </div>
                <p style={{margin:'5px'}}>{comment.message}</p>
                <button className="text-amber-700 text-sm font-medium cursor-pointer mt-2 hover:underline">
                  <i className="fa-solid fa-reply mr-1"></i> Reply
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </main>
  );
}

export default Community;