function Footer() {
    return (
      <footer>
        <div>
          <strong className="social-title">Phone</strong><br />
          <a href="tel:0704428062">070-4428-062</a>
        </div>
        <div>
          <strong className="social-title">Email</strong><br />
          <a href="mailto:maximumz160@gmail.com">maximumz160@gmail.com</a>
        </div>
        <div>
          <strong className="social-title">Follow Me</strong><br />
          <a href="https://zalo.me/0704428062"><img src="/zalo.png" alt="Zalo" /></a>
          <a href="https://www.facebook.com/maximumz160/"><img src="/facebook.png" alt="Facebook" /></a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} Max Hoang. Powered with love.
        </div>
      </footer>
    );
  }
  
  export default Footer;
  