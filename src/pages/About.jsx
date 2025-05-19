import React, { useState } from "react";
import "../css/About.css";
import { FaBook, FaQuestionCircle, FaUsers, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container">
      {/* Header */}
      <header className="navbar">
        <div className="section-container navbar-inner">
          <div className="logo">Teacher Max</div>

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
            <Link to="/about" className="active">About</Link>
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

      {/* Teaching Philosophy */}
      <section className="section-container">
        <h2 className="section-title">Teaching Philosophy</h2>
        <p className="section-subtitle">
          My core beliefs and approach to fostering learning.
        </p>

        <div className="philosophy-grid">
          <div className="philosophy-card">
            <FaBook className="icon" />
            <strong>Critical Thinking</strong>
            <p>
              Empowering students to analyze, evaluate, and synthesize information effectively, fostering intellectual independence.
            </p>
          </div>

          <div className="philosophy-card">
            <FaQuestionCircle className="icon" />
            <strong>Inquiry-Based Learning</strong>
            <p>
              Guiding students through exploration and discovery, encouraging curiosity and deeper understanding.
            </p>
          </div>

          <div className="philosophy-card">
            <FaUsers className="icon" />
            <strong>Collaborative Environment</strong>
            <p>
              Creating a supportive classroom where students learn from each other and build strong interpersonal skills.
            </p>
          </div>

          <div className="philosophy-card">
            <FaHeart className="icon" />
            <strong>Passion for Reading</strong>
            <p>
              Instilling a lifelong love for literature and effective communication through diverse texts and writing practices.
            </p>
          </div>
        </div>
      </section>

      {/* Area of Expertise */}
      <section className="section-container">
        <h2 className="section-title">Area of expertise</h2>
        <p className="section-subtitle">
          Subjects and skills I specialize in teaching.
        </p>

        <div className="expertise-tags">
          <span>AP Literature</span>
          <span>World History</span>
          <span>Creative Writing</span>
          <span>Educational Technology</span>
          <span>Student Mentorship</span>
          <span>Curriculum Design</span>
          <span>Academic Research</span>
          <span>College Essay Coaching</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-wrapper">
        <div className="footer-modern section-container">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Max. All rights reserved.
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

export default About;
