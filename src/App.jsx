import React, { lazy, Suspense } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contactus from "./pages/Contactus/Contactus";
import Home from "./pages/Home/Home";
import Hero from "./components/Hero/Hero";
import Accountpage from "./pages/Accounts/Accountpage";
import InterpreterPage from "./pages/interpreterspage/InterpreterPage";
import Player from "./pages/player/Player";
import Hero2 from "./components/Hero/Hero2";
import MovieApp from "./pages/MovieApp/MovieApp";
import UserProfile from "./pages/UserProfile/UserProfile";
import AdminPage from "./pages/AdminPage/AdminPage";
import Watchlist from "./pages/Watchlist/Watchlist";
import Protector from "./components/Protector/Protector";
import Building from "./components/Building/Building";
import Tvshows from "./pages/Tvshows/Tvshows";
import Livestreaming from "./pages/Livestreaming/Livestreaming";
import Cinema from "./pages/Cinema/Cinema";
import PlayerSeasons from "./pages/player/PlayerSeasons";
import CinemaSe from "./pages/Cinema/CinemaSe";
import About from "./pages/About/About";


const LazyPlayerseasons = lazy(() => import("./pages/player/PlayerSeasons"));
const LazyWatchlist = lazy(() => import("./pages/Watchlist/Watchlist"));
const LazyHome = lazy(() => import("./pages/Home/Home"));
const LazyContactus = lazy(() => import("./pages/Contactus/Contactus"));
const LazyHero = lazy(() => import("./components/Hero/Hero"));
const LazyAccountpage = lazy(() => import("./pages/Accounts/Accountpage"));
const LazyInterpreterPage = lazy(() =>
  import("./pages/interpreterspage/InterpreterPage")
);
const LazyMovieApp = lazy(() => import("./pages/MovieApp/MovieApp"));
const LazyPlayer = lazy(() => import("./pages/player/Player"));
const LazyUserProfile = lazy(() => import("./pages/UserProfile/UserProfile"));
const LazyAdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));
const LazyCinema = lazy(() => import("./pages/Cinema/Cinema"));
const LazyCinemase = lazy(() => import("./pages/Cinema/CinemaSe"));


function App() {
  
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/watchlist" element={<Protector><Watchlist /></Protector>}/>
          <Route path="/" element={<Home />} />
          <Route path="building" element={<Building />} />
          <Route path="/tvshows" element={<Tvshows />} />
          <Route path="/livestreaming" element={<Livestreaming />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/account" element={<LazyAccountpage />} />
          <Route path="/interpreterpage/:id" element={<Protector><LazyInterpreterPage /></Protector>}/>
          <Route path="/moviesites/:siteid" element={<MovieApp/>}/>
          <Route path="/player/:movieid" element={<Protector><LazyPlayer /></Protector>}/>
          <Route path="/seasons/:seasonid" element={<Protector><LazyPlayerseasons /></Protector>}/>
          <Route path="/cinema/:movieid" element={<Protector><LazyCinema /></Protector>}/>
          <Route path="/cinemase/:episodeid" element={<Protector><LazyCinemase /></Protector>}/>
          <Route path="/userprofile"element={<LazyUserProfile />}/>
          <Route path="/adminpage" element={<Protector adminOnly={true}><LazyAdminPage /></Protector>} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <div className="w-screen h-screen flex items-center justify-center bg-black">
                <img
                  src="https://i.pinimg.com/736x/a4/3e/e6/a43ee6d3e310564af22b71bdfb1a52e7.jpg"
                  alt="Not Found"
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
                <Link to={'/'}>
                <button title="Home"  className="bg-white text-black rounded-[5px] absolute top-6 left-7" style={{padding:'5px 20px'}}>Home</button>
                </Link>
              </div>
            }
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
