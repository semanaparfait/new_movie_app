import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Accountpage.css";
import bgimage from "../../assets/images/account/bg react.jpg";
import facebook from "../../assets/images/account/facebook.png";
import google from "../../assets/images/account/google.png";
import logo from "../../assets/images/overlay-2.png";
import { useNavigate } from "react-router-dom";
import code from "../../assets/images/account/frame (2).png"

function Accountpage() {
  const navigate = useNavigate();

  const [action, setAction] = useState("Sign up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [loginalert, setLoginalert] = useState(false);
  const [loginfailed, setLoginfailed] = useState(false);
  const [signupsuccess, setSignupsuccess] = useState(false);
  const [signupfailed, setSignupfailed] = useState(false);

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";
  const submitform = async (e) => {
    e.preventDefault();

    if (action === "Sign up") {
      // if (!validatePhoneNumber(phonenumber)) {
      //   alert("Please enter a valid phone number.");
      //   return;
      // }

      // Call backend signup API
      try {
        const response = await fetch(`${API_URL}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          setSignupsuccess(true);
          // alert(data.message);
          // Optionally reset form fields here
          setUsername("");
          setEmail("");
          // setPhonenumber("");
          setPassword("");
        } else {
          // alert(data.message);
          setSignupfailed(true);
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
        if (response.ok) {
          localStorage.setItem("token", data.token);
          setLoginalert(true); // Ensure alert is triggered

          if (data.is_admin === true) {
            navigate("/adminpage");
          } else {
            // navigate("/");
          }
        } else {
          setLoginfailed(true);
          // alert(data.message || "Login failed.");
        }
      } catch (error) {
        alert("Network error: " + error.message);
      }
    }
  };

// const validatePhoneNumber = (number) => {
//   // Matches + followed by 1-3 digit country code, then 7-12 digits
//   const phoneRegex = /^\+\d{1,3}\d{7,12}$/;
//   return phoneRegex.test(number);
// };


  return (
    <section className="absolute  inset-0 bg-[url('https://i.pinimg.com/736x/19/8b/2f/198b2f01e73b905772279616eccc7c65.jpg')] bg-cover bg-center bg-fixed">
      {/* Login Alert */}
      {loginalert && (
        <div className="login-alert absolute left-1/2 top-8 transform -translate-x-1/2 z-50">
          <div
            className="bg-white text-black text-center max-w-md mx-auto w-full relative rounded-[6px] border-none"
            style={{ padding: "0 50px" }}
          >
            <i className="fa-solid fa-circle-check text-green-600 text-5xl absolute left-1/2 -translate-x-1/2 -top-6"></i>
            <br />
            <br />
            <h1 className="font-semibold text-3xl">Congratulations</h1>
            <br />
            <h4>
              Welcome back, <span className="font-semibold">{email}</span>!{" "}
              <br /> Glad to see you again.
            </h4>
            <button
              className="bg-green-700 text-white rounded-[5px] w-1/4 h-[2rem]"
              onClick={() => {
                setLoginalert(false);
                navigate("/"); // Navigate to home page
              }}
            >
              Done
            </button>
            <br />
            <br />
          </div>
        </div>
      )}
      {/* Login Failed Alert */}
      {loginfailed && (
        <div className="login-alert absolute left-1/2 top-8 transform -translate-x-1/2 z-50 w-full md:w-1/4">
          <div
            className="bg-white text-black text-center max-w-md mx-auto w-full relative rounded-[6px] border-none"
            style={{ padding: "0 20px" }}
          >
            <i className="fa-solid fa-circle-xmark text-red-600 text-5xl absolute left-1/2 -translate-x-1/2 -top-6"></i>
            <br />
            <br />
            <h1 className="font-semibold text-3xl">Login Failed</h1>
            <br />
            <h4 className="text-red-600">
              Invalid email or password. Please try again.
            </h4>
            <button
              className="bg-red-700 text-white rounded-[5px] w-1/3 h-[2rem]"
              onClick={() => {
                setLoginfailed(false);
                // navigate("/"); // Optionally navigate to home page
              }}
            >
              Try Again
            </button>
            <br />
            <br />
          </div>
        </div>
      )}
      {/* Signup Success Alert */}
      {signupsuccess && (
        <div className="login-alert absolute left-1/2 top-8 transform -translate-x-1/2 z-50 w-full md:w-1/4">
          <div
            className="bg-white text-black text-center max-w-md mx-auto w-full relative rounded-[6px] border-none"
            style={{ padding: "0 20px" }}
          >
            <i className="fa-solid fa-circle-check text-green-600 text-5xl absolute left-1/2 -translate-x-1/2 -top-6"></i>
            <br />

            <h1 className="font-semibold text-3xl">Signup Successful</h1>
            <br />
            <h4>
              Your account has been created successfully. You can now log in.
            </h4>
            <button
              className="bg-green-700 text-white rounded-[5px] w-1/3 h-[2rem]"
              onClick={() => {
                setSignupsuccess(false);
                setAction("Log in"); // Switch to login form
              }}
            >
              Log In
            </button>
            <br />
            <br />
          </div>
        </div>
      )}
      {/* Signup Failed Alert */}
      {signupfailed && (
        <div className="login-alert absolute left-1/2 top-8 transform -translate-x-1/2 z-50 w-full md:w-1/4">
          <div
            className="bg-white text-black text-center  relative rounded-[6px] border-none"
            style={{ padding: "0 20px" }}
          >
            <i className="fa-solid fa-circle-xmark text-red-600 text-5xl absolute left-1/2 -translate-x-1/2 -top-6"></i>
            <br />
            <h1 className="font-semibold text-3xl">Signup Failed</h1>
            <br />
            <h4 className="text-red-600">
              Signup failed. Please try again with different credentials or fill
              all fields.
            </h4>
            <button
              className="bg-red-700 text-white rounded-[5px] w-1/3 h-[2rem]"
              onClick={() => {
                setSignupfailed(false);
                // navigate("/"); // Optionally navigate to home page
              }}
            >
              Try Again
            </button>
            <br />
            <br />
          </div>
        </div>
      )}
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
      <div className="min-h-screen flex items-center justify-center flex-wrap">
        <div className="right-tect-content text-center text-white space-y-4 w-full max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold">{action}</h1>
          {/* <h4 className="text-lg sm:text-2xl">SEMANA SHEMA PARFAIT</h4> */}

          {/* Inputs */}
          <div className="space-y-3 text-black ">
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
              type="tel"
              value={phonenumber}
              onChange={(e) => {
                const input = e.target.value;
                setPhonenumber(input);

                // Optional: real-time validation
                if (input && !validatePhoneNumber(input)) {
                  e.target.setCustomValidity("Please enter a valid international phone number, e.g., +250783456789");
                } else {
                  e.target.setCustomValidity(""); // Clear error
                }
              }}
              placeholder="Enter your Phone number in international format, e.g., +250783456789"
              className="w-full rounded-[10px] bg-white/90 outline-none text-sm h-[2.5rem] hidden"
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
              {/* <p className="text-red-700 inset-0">Invalid email</p> */}

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-[10px] bg-white/90 outline-none text-sm h-[2.5rem]"
                style={{ paddingLeft: "7px" }}
              />
              {action === "Log in" && (
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

        {/* ---------------qrcode------------ */}
      <div className=" hidden md:block right-tect-content text-center text-white  ">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Quick Login</h1>
          <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Glowing effect behind the QR code */}
        <div className="relative group inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-white p-3 rounded-lg">
            <img 
              src={code} 
              alt="Scan me" 
              className="w-52 h-52" 
            />
          </div>
        </div>

        <p className="mt-8 text-gray-400 text-sm">
          Having trouble? <span className="text-blue-400 cursor-pointer hover:underline">Use password instead</span>
        </p>
      </div>
      </div>
    </section>
  );
}

export default Accountpage;
