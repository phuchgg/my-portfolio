import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';


function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <Link to="/" className="logo" onClick={handleLinkClick}>
        <span className="dot"></span>
        Max Hoang
        <span className="role">Educator</span>
      </Link>

      <div
        className={`menu-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <Link to="https://github.com/phuchgg" onClick={handleLinkClick}>Dự án</Link>
        <Link to="https://www.linkedin.com/in/phuc-hgg/" onClick={handleLinkClick}>CV</Link>
        <Link to="/contact" onClick={handleLinkClick}>Liên hệ</Link>
        <Link to="/news" onClick={handleLinkClick}>Tin tức</Link>
      </nav>
    </header>
  );
}

export default Navbar;
