import { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaRegCopy, FaCheck } from 'react-icons/fa';
import './Contact.css';

interface ContactProps {
  language: string;
}

// Sähköpostiosoite on yhdessä paikassa, jotta sen vaihtaminen on helppoa.
const EMAIL_ADDRESS = 'artistihakala@gmail.com';

const Contact = ({ language }: ContactProps) => {
  // Näytetäänkö "Kopioitu!" -teksti hetken kopioinnin jälkeen
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const resetTimer = useRef<number | undefined>(undefined);

  // Siivotaan ajastin pois, jos kävijä siirtyy toiselle sivulle kesken
  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const translations = {
    en: {
      title: 'Contact Me',
      collaborate: "Let's Collaborate",
      intro: 'Tell me about your project: the style, the schedule and where the music will be used.',
      location: 'Based in Finland',
      emailButton: 'Send an email',
      copyButton: 'Copy address',
      copied: 'Copied!',
      copyFailed: 'Copying failed – select the address above',
      subject: 'Inquiry via hakalamusic.com'
    },
    fi: {
      title: 'Ota Yhteyttä',
      collaborate: 'Tehdään Yhteistyötä',
      intro: 'Kerro projektistasi: tyylilaji, aikataulu ja mihin musiikki tulee.',
      location: 'Sijainti: Suomi',
      emailButton: 'Lähetä sähköpostia',
      copyButton: 'Kopioi osoite',
      copied: 'Kopioitu!',
      copyFailed: 'Kopiointi ei onnistunut – valitse osoite yltä',
      subject: 'Yhteydenotto hakalamusic.com-sivuston kautta'
    }
  };

  const t = translations[language as keyof typeof translations];

  // Avaa kävijän oman sähköpostiohjelman, aiherivi valmiiksi täytettynä
  const mailtoLink = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(t.subject)}`;

  // Kopioi osoitteen leikepöydälle (hyödyllinen esim. Gmailia selaimessa käyttäville)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyStatus('idle'), 2500);
  };

  return (
    <div className="page-contact">
      <section className="hero-banner-contact">
        <h1>{t.title}</h1>
        <hr className="divider" />
        <div className="contact-card">
          <h3>{t.collaborate}</h3>
          <p className="contact-intro">{t.intro}</p>

          <p className="contact-address">{EMAIL_ADDRESS}</p>

          <div className="contact-actions">
            <a className="contact-button contact-button-primary" href={mailtoLink}>
              <FaEnvelope aria-hidden="true" />
              <span>{t.emailButton}</span>
            </a>
            <button
              type="button"
              className={`contact-button contact-button-secondary ${copyStatus === 'copied' ? 'is-copied' : ''}`}
              onClick={handleCopy}
            >
              {copyStatus === 'copied' ? <FaCheck aria-hidden="true" /> : <FaRegCopy aria-hidden="true" />}
              <span>{copyStatus === 'copied' ? t.copied : t.copyButton}</span>
            </button>
          </div>

          {/* Ruudunlukijat kertovat tämän viestin ääneen */}
          <p className="contact-copy-status" aria-live="polite">
            {copyStatus === 'failed' ? t.copyFailed : ''}
          </p>

          <p className="contact-location">{t.location}</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
