import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import '../css/contact.css';
import { Link } from 'react-router-dom';
import { MdEmail, MdPhone, MdLocationOn, MdWork } from 'react-icons/md';
import { FiGlobe } from 'react-icons/fi';
import logo from '../images/logo.png';

function Contact() {
  const form = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_tk7b6xr',
      'template_71kghqk',
      form.current,
      'user_e42MTmRZdDbNo2xLgFN6U'
    ).then(() => {
      alert('Message sent successfully! 🎉');
      form.current.reset();
    }, () => {
      alert('Failed to send message. 😢 Try again later.');
    });
  };

  return (
    <div className="container">
      {/* === Navbar === */}
      <header className="navbar">
        <div className="section-container navbar-inner">
                    <Link to="/">
            <img src={logo} alt="Teacher Max Logo" className="logo-image" />
          </Link>

          <div
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <a
  href="https://github.com/phuchgg"
  target="_blank"
  rel="noreferrer"
  onClick={() => setIsMenuOpen(false)}
>
  Projects
</a>

            <Link to="/contact" className="active" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      </header>

      {/* === Contact Section === */}
      <main className="contact-modern">
        <div className="section-container">
          <div className="contact-wrapper">
            <h1 className="contact-title">Get In Touch</h1>
            <p className="section-subtitle center-align">
              I’d love to connect and discuss educational opportunities
            </p>

            <div className="contact-columns">
              <form ref={form} onSubmit={sendEmail} className="contact-form">
                <h3>Send a message</h3>
                <label>Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your email address"
                  required
                />
                <label>Messages</label>
                <textarea
                  name="message"
                  placeholder="Write your message here"
                  rows="6"
                  required
                ></textarea>
                <button type="submit">Submit</button>
              </form>

              <div className="contact-details">
  <h3>Contact Details</h3>

  <p>
    <MdEmail size={20} />
    <a href="mailto:maximumz160@gmail.com" style={{ textDecoration: 'none' }}>
      maximumz160@gmail.com
    </a>
  </p>

  <p>
    <MdPhone size={20} />
    <a href="tel:0704428062" style={{ textDecoration: 'none' }}>
      070.4428.062
    </a>
  </p>

  <p>
    <MdLocationOn size={20} />
    <a
      href="https://maps.google.com/?q=Binh+Tan+District,+Ho+Chi+Minh+City"
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: 'none' }}
    >
      HCM City, Binh Tan Dis
    </a>
  </p>

  <p>
    <MdWork size={20} />
    <a
      href="https://zalo.me/0704428062"
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: 'none' }}
    >
      Zalo
    </a>
  </p>
</div>
            </div>
          </div>
        </div>
      </main>

      {/* === Footer === */}
      <footer className="footer-wrapper">
        <div className="footer-modern section-container">
          <div className="footer-copy">© 2025 Max. All rights reserved.</div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/phuc-hgg/">LinkedIn</a>
            <a href="https://github.com/phuchgg">GitHub</a>
            <a href="https://zalo.me/0704428062">Zalo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
