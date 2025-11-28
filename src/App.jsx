import React, { lazy, Suspense } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protector from "./components/Protector/Protector";
import Building from "./components/Building/Building";

// ✅ PROPERLY lazy load ALL components
const LazyHome = lazy(() => import("./pages/Home/Home"));
const LazyContactus = lazy(() => import("./pages/Contactus/Contactus"));
const LazyAccountpage = lazy(() => import("./pages/Accounts/Accountpage"));
const LazyInterpreterPage = lazy(() => import("./pages/interpreterspage/InterpreterPage"));
const LazyMovieApp = lazy(() => import("./pages/MovieApp/MovieApp"));
const LazyPlayer = lazy(() => import("./pages/player/Player"));
const LazyPlayerSeasons = lazy(() => import("./pages/player/PlayerSeasons"));
const LazyUserProfile = lazy(() => import("./pages/UserProfile/UserProfile"));
const LazyAdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));
const LazyWatchlist = lazy(() => import("./pages/Watchlist/Watchlist"));
const LazyTvshows = lazy(() => import("./pages/Tvshows/Tvshows"));
const LazyLivestreaming = lazy(() => import("./pages/Livestreaming/Livestreaming"));
const LazyCinema = lazy(() => import("./pages/Cinema/Cinema"));
const LazyCinemaSe = lazy(() => import("./pages/Cinema/CinemaSe"));
const LazyAbout = lazy(() => import("./pages/About/About"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="w-screen h-screen flex items-center justify-center bg-black hidden">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/building" element={<Building />} />
          <Route path="/tvshows" element={<LazyTvshows />} />
          <Route path="/livestreaming" element={<LazyLivestreaming />} />
          <Route path="/contactus" element={<LazyContactus />} />
          <Route path="/account" element={<LazyAccountpage />} />
          <Route path="/watchlist" element={<Protector><LazyWatchlist /></Protector>}/>
          <Route path="/interpreterpage/:id" element={<Protector><LazyInterpreterPage /></Protector>}/>
          <Route path="/moviesites/:siteid" element={<LazyMovieApp/>}/>
          <Route path="/player/:movieid" element={<Protector><LazyPlayer /></Protector>}/>
          <Route path="/seasons/:seasonid" element={<Protector><LazyPlayerSeasons /></Protector>}/>
          <Route path="/cinema/:movieid" element={<Protector><LazyCinema /></Protector>}/>
          <Route path="/cinemase/:episodeid" element={<Protector><LazyCinemaSe /></Protector>}/>
          <Route path="/userprofile" element={<LazyUserProfile />}/>
          <Route path="/adminpage" element={<Protector adminOnly={true}><LazyAdminPage /></Protector>} />
          <Route path="/about" element={<LazyAbout />} />
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
                <button title="Home" className="bg-white text-black rounded-[5px] absolute top-6 left-7" style={{padding:'5px 20px'}}>Home</button>
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
