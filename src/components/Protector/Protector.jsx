import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true; // send cookies automatically

const Protector = ({ children }) => {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/me`, { method: "GET", credentials: "include" })
      .then((response) => {
        setAuthenticated(true);
        setIsAdmin(response.data.is_admin); // Assuming the API returns is_admin
        // console.log("API Response:", response.data); // Debug log
      })
      .catch(() => {
        setAuthenticated(false);
        setIsAdmin(false);
        // console.log("Authentication failed or API error"); // Debug log
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  console.log("Authenticated:", authenticated); // Debug log
  console.log("Is Admin:", isAdmin); // Debug log
  console.log("Current Path:", location.pathname); // Debug log

  if (location.pathname === "/adminpage" && !isAdmin) {
    return <Navigate to="/" replace />; // Redirect if not an admin
  }

  return authenticated ? children : <Navigate to="/" replace />;
};

export default Protector;
