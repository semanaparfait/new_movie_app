import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true; // send cookies automatically

const Protector = ({ children }) => {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/me`, { method: "GET" , credentials: "include" })
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return authenticated ? children : <Navigate to="/" replace />;
};

export default Protector;
