import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/Components/Header.jsx";
import Home from "../src/pages/Home.jsx";
import Searchbar from "../src/Components/Searchbar.jsx";
import Favorites from "../src/pages/fovorites.jsx";
import Movies from "../src/pages/Movies.jsx";
// import Footer from "./footer.jsx";

function App() {
  
  return (
    <>
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="../src/pages/fovorites.jsx" element={<Favorites />} />
        <Route path="../src/pages/Movies.jsx " element={<Movies  />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
      </>
  )
}

export default App
