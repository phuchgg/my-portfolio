import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import '../css/contact.css';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_tk7b6xr', 'template_71kghqk', form.current, 'user_e42MTmRZdDbNo2xLgFN6U')
      .then((result) => {
          alert('Message sent successfully! 🎉');
          form.current.reset(); // Clear form sau khi gửi
      }, (error) => {
          alert('Failed to send message. 😢 Try again later.');
      });
  };

  return (
    <main>
      <section className="contact-wrapper">
        <div className="contact-box">
          <h1>Inbox tui đi chờ chi!</h1>
          <p className="description">Cam kết không seen rồi để đó.</p>
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="user_name" placeholder="Tên của ní" required />
            <input type="email" name="user_email" placeholder="Email ne" required />
            <textarea name="message" placeholder="E hèm hỏi giề" rows="5" required></textarea>
            <button type="submit">Quăng nhẹ cái tin</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;
