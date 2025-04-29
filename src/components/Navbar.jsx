import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <Link to="/" className="logo">
        <span className="dot"></span>
        Max Hoang
        <span className="role">Educator</span>
      </Link>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <Link to="https://www.linkedin.com/in/phuc-hgg/">Resume</Link>
        <Link to="https://github.com/phuchgg">Projects</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Navbar;
