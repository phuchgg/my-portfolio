import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import FloatingChatButton from './components/FloatingChatButton';
import TechFeed from "./pages/TechFeed";
import { useEffect } from "react";
import StatsCounter from "./components/StatsCounter";

function App() {
  const location = useLocation ();
  useEffect(() => {
    document.body.classList.remove("news-page");
    if (location.pathname === "/news") {
      document.body.classList.add("news-page");
    }
  }
  , [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<TechFeed />} />
      </Routes>
      <StatsCounter />
      <Footer />
      <FloatingChatButton />
    </>
  );
}

export default App;
