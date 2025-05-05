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
          <h1>Chào bạn, mình là Phúc</h1>
          <h3>Đây là vài dòng giới thiệu chân thật và gần gũi về mình.</h3>
          <p>
          Mình là một giáo viên IELTS tận tâm, với niềm đam mê lớn dành cho công nghệ, tâm lý học và sự sáng tạo không ngừng. Mình tin mình có khả năng "phiên dịch" những con số hay kiến thức phức tạp nhất thành ngôn ngữ gần gũi, ai đọc cũng thấy 'gật gù'. Mục tiêu chính? Đưa học viên 'cán đích' IELTS thành công! À, và song song đó là 'đấu tranh' với mấy em code bug và tìm cách 'thoát ly' những lúc lỡ "overthinking"! 😉<br />
          </p>
          <div className="buttons">
            <a href="https://www.linkedin.com/in/phuc-hgg/" className="resume">CV</a>
            <a href="https://github.com/phuchgg" className="projects">Dự án</a>
            <Link to="/contact" className="contact">Liên hệ</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
