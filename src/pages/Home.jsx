import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="hero">
        <img src="/images/Max.jpg" alt="Max Hoang" draggable="false"
          onContextMenu={(e) => e.preventDefault()} // ⛔ chặn chuột phải
          style={{
            userSelect: "none",    // không cho bôi đen
            pointerEvents: "auto"  // giữ khả năng click nếu cần
          }} />
        <div className="intro">
          <h1>Xin chào</h1>
          <h3>Vài dòng không deep nhưng real</h3>
          <p>
            Xin chào, mình là giáo viên IELTS có tâm, mê công nghệ, ghiền tâm lý, thích sáng tạo, giỏi "bốc phét" số liệu thành câu chuyện đời thường. Nhiệm vụ của mình là đưa học trò qua hết "ải IELTS", và thi thoảng đưa bản thân thoát khỏi vòng lặp code bug và tâm lý "overthinking"! 😉<br />
          </p>
          <div className="buttons">
            <a href="https://www.linkedin.com/in/phuc-hgg/" className="resume">Resume</a>
            <a href="https://github.com/phuchgg" className="projects">Dự án</a>
            <Link to="/contact" className="contact">Liên hệ</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
