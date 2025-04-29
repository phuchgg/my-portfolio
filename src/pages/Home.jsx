import { Link } from "react-router-dom";

function Home() {
    return (
      <main>
        <section className="hero">
          <img src="/images/Max.png" alt="Max Nguyen" />
          <div className="intro">
            <h1>Hello</h1>
            <h3>A Bit About Me</h3>
            <p>
              I'm an IELTS teacher, passionate about tech, psychology, and creativity. I love connecting data with human stories, and guiding learners to reach their goals.<br />
            </p>
            <div className="buttons">
              <a href="https://www.linkedin.com/in/phuc-hgg/" className="resume">Resume</a>
              <a href="https://github.com/phuchgg" className="projects">Projects</a>
              <Link to="/contact" className="contact">Contact</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }
  
  export default Home;
  