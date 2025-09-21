import React, { lazy, Suspense } from "react";
import { useState } from "react";
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
import AdminAcc from "./components/AdminAcc/AdminAcc";
import Clerk from "./pages/Clerk/Clerk";
import Watchlist from "./pages/Watchlist/Watchlist";
import Protector from "./components/Protector/Protector";
import Building from "./components/Building/Building";
import Tvshows from "./pages/Tvshows/Tvshows";
import Livestreaming from "./pages/Livestreaming/Livestreaming";

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
const LazyAdminAcc = lazy(() => import("./components/AdminAcc/AdminAcc"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/watchlist"
            element={
              <Protector>
                <Watchlist />
              </Protector>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="building" element={<Building />} />
          
          <Route path="/tvshows" element={<Tvshows />} />
          <Route path="/livestreaming" element={<Livestreaming />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/account" element={<LazyAccountpage />} />
          <Route
            path="/interpreterpage/:id"
            element={
              <Protector>
                <LazyInterpreterPage />
              </Protector>
            }
          />
          <Route
            path="/moviesites/:siteid"
            element={
             
                <LazyMovieApp />
             
            }
          />
          <Route
            path="/player/:movieid"
            element={
              <Protector>
                <LazyPlayer />
              </Protector>
            }
          />
          <Route
            path="/userprofile"
            element={
             
                <LazyUserProfile />
          
            }
          />
          <Route path="/adminpage" element={<LazyAdminPage />} />
          <Route
            path="/adminaccounts"
            element={
              <Protector>
                <LazyAdminAcc />
              </Protector>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
