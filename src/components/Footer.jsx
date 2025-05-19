function Footer() {
  return (
    <footer className="footer-modern">
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} Max. All rights reserved.
      </div>
      <div className="footer-social">
        <a href="https://www.linkedin.com/in/phuc-hgg/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/phuchgg" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
    </footer>
  );
}

export default Footer;
