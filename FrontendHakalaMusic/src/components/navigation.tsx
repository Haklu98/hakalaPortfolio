import { useState, useEffect } from 'react';
import '../styles/Navigation.css';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const Navigation = ({ currentPage, setCurrentPage, language, setLanguage }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hideTimeout, setHideTimeout] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        if (window.scrollY === 0) {
          setIsVisible(true);
          if (hideTimeout) clearTimeout(hideTimeout);
        } else {
          if (hideTimeout) clearTimeout(hideTimeout);
          const timeout = setTimeout(() => setIsVisible(false), 3000);
          setHideTimeout(timeout);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [hideTimeout]);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const translations = {
    en: { home: 'Home', about: 'About', music: 'Music', contact: 'Contact' },
    fi: { home: 'Koti', about: 'Tietoa', music: 'Musiikki', contact: 'Yhteystiedot' }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <nav className={`navigation ${!isVisible ? 'nav-hidden' : ''}`}>
      <div className="nav-brand">
        <h2>// HAKALA //</h2>
      </div>
      
      <button 
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      
      <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
        <li><a onClick={() => handleNavClick('home')} className={currentPage === 'home' ? 'active' : ''}>{t.home}</a></li>
        <li><a onClick={() => handleNavClick('about')} className={currentPage === 'about' ? 'active' : ''}>{t.about}</a></li>
        <li><a onClick={() => handleNavClick('portfolio')} className={currentPage === 'portfolio' ? 'active' : ''}>{t.music}</a></li>
        <li><a onClick={() => handleNavClick('contact')} className={currentPage === 'contact' ? 'active' : ''}>{t.contact}</a></li>
        <li className="lang-toggle">
          <button 
            className="lang-button"
            onClick={() => setLanguage(language === 'en' ? 'fi' : 'en')}
          >
            {language.toUpperCase()}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
