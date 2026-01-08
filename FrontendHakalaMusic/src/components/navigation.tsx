import { useState } from 'react';
import { FaSpotify, FaInstagram, FaTiktok, FaYoutube, FaChevronDown, FaSoundcloud } from 'react-icons/fa';
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
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMusicDropdownOpen, setIsMusicDropdownOpen] = useState(false);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    setIsMusicDropdownOpen(false);
  };

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const translations = {
    en: { 
      home: 'Home', 
      about: 'About', 
      music: 'Music', 
      contact: 'Contact',
      filmMusic: 'Film Music',
      videoGameMusic: 'Video Game Music'
    },
    fi: { 
      home: 'Koti', 
      about: 'Tietoa', 
      music: 'Musiikki', 
      contact: 'Yhteystiedot',
      filmMusic: 'Elokuvamusiikki',
      videoGameMusic: 'Videopelimusiikki'
    }
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
        <li className="music-dropdown">
          <button 
            className={`music-dropdown-button ${(currentPage === 'film-music' || currentPage === 'video-game-music' || currentPage === 'portfolio') ? 'active' : ''}`}
            onClick={() => setIsMusicDropdownOpen(!isMusicDropdownOpen)}
          >
            <span className="music-text">{t.music}</span>
            <FaChevronDown className={`chevron ${isMusicDropdownOpen ? 'chevron-up' : ''}`} />
          </button>
          {isMusicDropdownOpen && (
            <div className="music-dropdown-menu">
              <button onClick={() => handleNavClick('film-music')} className={currentPage === 'film-music' ? 'active' : ''}>
                {t.filmMusic}
              </button>
              <button onClick={() => handleNavClick('video-game-music')} className={currentPage === 'video-game-music' ? 'active' : ''}>
                {t.videoGameMusic}
              </button>
            </div>
          )}
        </li>
        <li><a onClick={() => handleNavClick('contact')} className={currentPage === 'contact' ? 'active' : ''}>{t.contact}</a></li>
        <li className="mobile-social-icons">
           <a href='https://open.spotify.com/artist/4aPGiD72YUspyHkT368CU9?si=n1oniX1rQMWcr4ry621-jQ' target="_blank"><FaSpotify /></a>
                    <a href='https://music.apple.com/us/artist/aleksi-hakala/1165871624' target="_blank"><SiApplemusic /></a>
                    <a href='https://www.instagram.com/aleksihakalacomposer/' target='_blank'><FaInstagram /></a>
                    <a href='https://www.tiktok.com/@aleksihakalacomposer' target="_blank"><FaTiktok /></a>
                    <a href='https://www.youtube.com/@Aleksi_Hakala' target="_blank"><FaYoutube /></a>
                    <a href='https://soundcloud.com/aleksihakala' target="_blank"><FaSoundcloud /></a>
        </li>
        <li className="lang-dropdown">
          <button 
            className="lang-dropdown-button"
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
          >
            {language.toUpperCase()}
            <FaChevronDown className={`chevron ${isLangDropdownOpen ? 'chevron-up' : ''}`} />
          </button>
          {isLangDropdownOpen && (
            <div className="lang-dropdown-menu">
              <button onClick={() => handleLanguageSelect('en')} className={language === 'en' ? 'active' : ''}>
                EN
              </button>
              <button onClick={() => handleLanguageSelect('fi')} className={language === 'fi' ? 'active' : ''}>
                FI
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
