import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Accountpage.css";
import bgimage from "../../assets/images/account/bg react.jpg";
import facebook from "../../assets/images/account/facebook.png";
import google from "../../assets/images/account/google.png";
import logo from "../../assets/images/overlay-2.png";
import { useNavigate } from "react-router-dom";

function Accountpage() {
  const navigate = useNavigate();

  const [action, setAction] = useState("Sign up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";
  const submitform = async (e) => {
    e.preventDefault();

    if (action === "Sign up") {
      // Call backend signup API
      try {
        const response = await fetch(`${API_URL}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, phonenumber, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          // Optionally reset form fields here
          setUsername("");
          setEmail("");
          setPhonenumber("");
          setPassword("");
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Network error: " + error.message);
      }
    } else if (action === "Log in") {
      // Call backend login API
      try {
        const response = await fetch(`${API_URL}/api/login`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok && data.is_admin === true) {
          navigate("/adminpage");
        } else if (response.ok) {
          alert(data.message);
          navigate("/"); // Redirect on success
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Network error: " + error.message);
      }
    }
  };

  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="absolute overflow-hidden  inset-0 bg-[url('https://i.pinimg.com/736x/19/8b/2f/198b2f01e73b905772279616eccc7c65.jpg')] bg-cover bg-center ">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 md:left-1/2 transform md:-translate-x-1/2 w-full md:w-[80%] flex justify-between items-center p-4 z-30 text-white ">
        <Link to={`/`}>
          <img src={logo} alt="weblogo" className="w-[6rem] " />
        </Link>
        <ul className="flex gap-3 text-xs sm:text-base">
          <li
            className="cursor-pointer font-bold"
            onClick={() => setAction("Log in")}
          >
            Login
          </li>
          <li
            className="cursor-pointer font-bold"
            onClick={() => setAction("Sign up")}
          >
            Sign up
          </li>
        </ul>
      </nav>
      <br />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Centered Content */}
      {/* Centered Content */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="right-tect-content text-center text-white space-y-4 w-full max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold">{action}</h1>
          <h4 className="text-lg sm:text-2xl">SEMANA SHEMA PARFAIT</h4>

          {/* Inputs */}
          <div className="space-y-3 text-black">
            <form onSubmit={submitform} className="flex flex-col gap-2">
              {action === "Log in" ? (
                <div></div>
              ) : (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Full name"
                  className="w-full rounded bg-white/90 outline-none text-sm"
                />
              )}
              {action === "Log in" ? (
                <div></div>
              ) : (
                <input
                  type="number"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  placeholder="Enter your Phone number"
                  pattern="^\+?[1-9][0-9]{7,14}$"
                  className="w-full rounded-[10px] bg-white/90 outline-none text-sm h-[2.5rem]"
                  style={{ paddingLeft: "7px" }}
                />
              )}

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded bg-white/90 outline-none text-sm"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-[10px] bg-white/90 outline-none text-sm h-[2.5rem]"
                style={{ paddingLeft: "7px" }}
              />
              {action === "Log in" ? (
                <div></div>
              ) : (
                <p className="text-right text-sm text-red-400 cursor-pointer">
                  Forgot your password?
                </p>
              )}

              {/* Buttons */}
              <button type="submit" className="signin-btn">
                {action}
              </button>
              <button className="google-btn ">
                Continue with Google <img src={google} />
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accountpage;
