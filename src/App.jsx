import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contactus from './pages/Contactus/Contactus';
import Home from './pages/Home/Home';
import Hero from './components/Hero/Hero';
import Accountpage from './pages/Accounts/Accountpage';
import InterpreterPage from './pages/interpreterspage/InterpreterPage';
import Player from './pages/player/Player';
import Hero2 from './components/Hero/Hero2';
import MovieApp from './pages/MovieApp/MovieApp';
import UserProfile from './pages/UserProfile/UserProfile';
import AdminPage from './pages/AdminPage/AdminPage';
import AdminAcc from './components/AdminAcc/AdminAcc';





function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/contactus" element={ <Contactus />} />
  <Route path="/hero" element={<Hero />} />
  <Route path="/account" element={<Accountpage />} />
  <Route path="/interpreterpage/:id" element={<InterpreterPage />} />
  <Route path="/moviesites/:siteid" element={<MovieApp />} />
  <Route path="/player/:movieid" element={<Player />} />
  <Route path="/userprofile" element={<UserProfile />}/>
  <Route path='/adminpage' element={<AdminPage />} />
  <Route path='/adminaccounts' element={<AdminAcc />} />
  {/* Add other routes here as needed */}
  <Route path='hero2' element={<Hero2 />}/>
  
  
 

  
</Routes>
</BrowserRouter>


  )
 
}

export default App
