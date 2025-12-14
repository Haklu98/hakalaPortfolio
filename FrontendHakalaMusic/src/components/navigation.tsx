import { useState, useEffect } from 'react';
import { FaSpotify, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import '../styles/Navigation.css';
import { LuMenu } from "react-icons/lu";

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const Navigation = ({ currentPage, setCurrentPage, language, setLanguage }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="navigation">
      <button 
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <LuMenu size={32} color="#fff" />
      </button>
      
      {isMenuOpen && <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} />}
      
      <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
        <li><a onClick={() => handleNavClick('home')} className={currentPage === 'home' ? 'active' : ''}>{t.home}</a></li>
        <li><a onClick={() => handleNavClick('about')} className={currentPage === 'about' ? 'active' : ''}>{t.about}</a></li>
        <li><a onClick={() => handleNavClick('portfolio')} className={currentPage === 'portfolio' ? 'active' : ''}>{t.music}</a></li>
        <li><a onClick={() => handleNavClick('contact')} className={currentPage === 'contact' ? 'active' : ''}>{t.contact}</a></li>
        <li className="mobile-social-icons">
          <FaSpotify />
          <SiApplemusic />
          <FaInstagram />
          <FaTiktok />
          <FaYoutube />
        </li>
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
