import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

interface ContactProps {
  language: string;
}

const Contact = ({ language }: ContactProps) => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          title: formData.title,
          message: formData.message,
          to_email: 'artistihakala@gmail.com'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      setFormData({ title: '', name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const translations = {
    en: {
      title: 'Contact Me',
      collaborate: "Let's Collaborate",
      email: 'Email: artistihakala@gmail.com',
      location: 'Based in: Finland',
      titlePlaceholder: 'Subject',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      sendButton: 'Send Message',
      sending: 'Sending...',
      successMessage: 'Message sent successfully!',
      errorMessage: 'Failed to send message. Please try again.'
    },
    fi: {
      title: 'Ota Yhteyttä',
      collaborate: 'Tehdään Yhteistyötä',
      email: 'Sähköposti: artistihakala@gmail.com',
      location: 'Sijainti: Suomi',
      titlePlaceholder: 'Aihe',
      namePlaceholder: 'Nimesi',
      emailPlaceholder: 'Sähköpostisi',
      messagePlaceholder: 'Viestisi',
      sendButton: 'Lähetä Viesti',
      sending: 'Lähetetään...',
      successMessage: 'Viesti lähetetty onnistuneesti!',
      errorMessage: 'Viestin lähetys epäonnistui. Yritä uudelleen.'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="page-contact">
      <section className="hero-banner-contact">
      <h1>{t.title}</h1>
      <hr className="divider" />
      <div className="contact-content">
        <div className="contact-info">
          <h3>{t.collaborate}</h3>
          <p>{t.email}</p>
          <p>{t.location}</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="title"
            placeholder={t.titlePlaceholder} 
            value={formData.title}
            onChange={handleInputChange}
            required 
          />
          <input 
            type="text" 
            name="name"
            placeholder={t.namePlaceholder} 
            value={formData.name}
            onChange={handleInputChange}
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder={t.emailPlaceholder} 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
          <textarea 
            name="message"
            placeholder={t.messagePlaceholder} 
            rows={5} 
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t.sending : t.sendButton}
          </button>
          {submitStatus === 'success' && <p className="success-message">{t.successMessage}</p>}
          {submitStatus === 'error' && <p className="error-message">{t.errorMessage}</p>}
        </form>
      </div>
      </section>
    </div>
  );
};

export default Contact;