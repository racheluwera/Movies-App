import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from 'react';
import Home from "./pages/Home.jsx";
// import Movies from "./pages/Movies.jsx";
import Favorites from "./pages/fovorites.jsx";
import Header from "./Components/Header.jsx";

function App() {
  return(
   <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/Movies" element={<Movies/>} /> */}
        <Route path="/Favorites" element={<Favorites />} />
       
      </Routes>
    </Router>
  );
}
export default App;
        