import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false); // 👈 Tự đóng menu khi click bất kỳ link nào
  };

  return (
    <header>
      <Link to="/" className="logo">
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
        <Link to="https://www.linkedin.com/in/phuc-hgg/" onClick={handleLinkClick}>Resume</Link>
        <Link to="https://github.com/phuchgg" onClick={handleLinkClick}>Dự án</Link>
        <Link to="/contact" onClick={handleLinkClick}>Liên hệ</Link>
      </nav>
    </header>
  );
}

export default Navbar;
