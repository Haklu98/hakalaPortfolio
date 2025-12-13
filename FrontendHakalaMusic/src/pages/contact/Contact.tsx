import './Contact.css';

interface ContactProps {
  language: string;
}

const Contact = ({ language }: ContactProps) => {
  const translations = {
    en: {
      title: 'Contact Me',
      collaborate: "Let's Collaborate",
      email: 'Email: music@hakala.com',
      booking: 'Booking: booking@hakala.com',
      location: 'Based in: Finland',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      sendButton: 'Send Message'
    },
    fi: {
      title: 'Ota Yhteyttä',
      collaborate: 'Tehdään Yhteistyötä',
      email: 'Sähköposti: music@hakala.com',
      booking: 'Varaukset: booking@hakala.com',
      location: 'Sijainti: Suomi',
      namePlaceholder: 'Nimesi',
      emailPlaceholder: 'Sähköpostisi',
      messagePlaceholder: 'Viestisi',
      sendButton: 'Lähetä Viesti'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="page">
      <h1>{t.title}</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h3>{t.collaborate}</h3>
          <p>{t.email}</p>
          <p>{t.booking}</p>
          <p>{t.location}</p>
        </div>
        <form className="contact-form">
          <input type="text" placeholder={t.namePlaceholder} required />
          <input type="email" placeholder={t.emailPlaceholder} required />
          <textarea placeholder={t.messagePlaceholder} rows={5} required></textarea>
          <button type="submit">{t.sendButton}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;