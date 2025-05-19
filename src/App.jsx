import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import FloatingChatButton from './components/FloatingChatButton';
import TechFeed from "./pages/TechFeed";
import StatsCounter from "./components/StatsCounter";
import About from './pages/About';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<TechFeed />} />
      </Routes>
    </>
  );
}

export default App;
