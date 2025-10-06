import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true; // send cookies automatically

const Protector = ({ children, requireAuth = false, requireAdmin = false }) => {
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
      .get(`${API_URL}/api/me`, { withCredentials: true })
      .then((response) => {
        setAuthenticated(true);
        setIsAdmin(response.data.is_admin);
      })
      .catch(() => {
        setAuthenticated(false);
        setIsAdmin(false);
      })
      .finally(() => setLoading(false));
  }, []);
  console.log("Authenticated:", authenticated); // Debug log 
  console.log("Is Admin:", isAdmin); // Debug log 
  console.log("Current Path:", location.pathname); // Debug log

  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Admin route protection
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Auth-required route protection
  if (requireAuth && !authenticated) {
    return <Navigate to="/login" replace />;
  }

  // All good
  return children;
};

export default Protector;
