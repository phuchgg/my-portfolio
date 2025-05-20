import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/index.css";
import logo from '../images/logo.png'

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container">
      {/* === Navbar === */}
      <header className="navbar">
        <div className="section-container navbar-inner full-width">
          <Link to="/">
  <img src={logo} alt="Teacher Max Logo" className="logo-image" />
</Link>
          <div
            className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <a
  href="https://github.com/phuchgg"
  target="_blank"
  rel="noreferrer"
  onClick={() => setIsMenuOpen(false)}
>
  Projects
</a>

            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </header>

      {/* === Hero Section === */}
      <main className="hero-wrapper">
        <section className="hero-new section-container">
          <div className="hero-left">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hi, I'm Max
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              A passionate teacher creating elegant solutions to complex teaching problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Link to="/contact" className="btn-primary">
                Get in touch
              </Link>
            </motion.div>
          </div>

          <div className="hero-right">
            <img src="/images/Max.jpg" alt="Max" />
          </div>
        </section>
      </main>

      {/* === Footer === */}
      <footer className="footer-wrapper">
        <div className="footer-modern section-container">
          <div className="footer-left">
            <span>© 2025 Max. All rights reserved.</span>
          </div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/phuc-hgg/">LinkedIn</a>
            <a href="https://github.com/?ref=github.co">GitHub</a>
            <a href="https://zalo.me/0704428062">Zalo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
