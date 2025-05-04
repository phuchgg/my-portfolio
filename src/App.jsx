import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import FloatingChatButton from './components/FloatingChatButton';
import TechFeed from "./pages/TechFeed";
import StatsCounter from "./components/StatsCounter";

function App() {
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
