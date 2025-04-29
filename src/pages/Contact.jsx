import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import '../css/contact.css'; // Link CSS nha Max!

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
          <h1>Contact Me</h1>
          <p className="description">Feel free to drop me a message!</p>
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="user_name" placeholder="Your Name" required />
            <input type="email" name="user_email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;
