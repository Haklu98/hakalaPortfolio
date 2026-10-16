import { useState, type MouseEvent } from 'react';
import { FaSpotify, FaInstagram, FaTiktok, FaYoutube, FaChevronDown, FaSoundcloud, FaBandcamp } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import '../styles/Navigation.css';
import { LuMenu } from "react-icons/lu";
import { PAGE_PATHS, type Page } from '../routes';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const Navigation = ({ currentPage, onNavigate, language, setLanguage }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMusicDropdownOpen, setIsMusicDropdownOpen] = useState(false);

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
    setIsMusicDropdownOpen(false);
  };

  // Tavallinen klikkaus vaihtaa sivun lataamatta koko sivustoa uudelleen.
  // Ctrl/Cmd-klikkaus ja hiiren rullaklikkaus avaavat sivun uuteen välilehteen kuten muuallakin.
  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, page: Page) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    handleNavClick(page);
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
        <li><a href={PAGE_PATHS['home']} onClick={(e) => handleLinkClick(e, 'home')} className={currentPage === 'home' ? 'active' : ''}>{t.home}</a></li>
        <li><a href={PAGE_PATHS['about']} onClick={(e) => handleLinkClick(e, 'about')} className={currentPage === 'about' ? 'active' : ''}>{t.about}</a></li>
        <li className="music-dropdown">
          <button 
            className={`music-dropdown-button ${(currentPage === 'film-music' || currentPage === 'video-game-music') ? 'active' : ''}`}
            onClick={() => setIsMusicDropdownOpen(!isMusicDropdownOpen)}
          >
            <span className="music-text">{t.music}</span>
            <FaChevronDown className={`chevron ${isMusicDropdownOpen ? 'chevron-up' : ''}`} />
          </button>
          {isMusicDropdownOpen && (
            <div className="music-dropdown-menu">
              <a href={PAGE_PATHS['film-music']} onClick={(e) => handleLinkClick(e, 'film-music')} className={currentPage === 'film-music' ? 'active' : ''}>
                {t.filmMusic}
              </a>
              <a href={PAGE_PATHS['video-game-music']} onClick={(e) => handleLinkClick(e, 'video-game-music')} className={currentPage === 'video-game-music' ? 'active' : ''}>
                {t.videoGameMusic}
              </a>
            </div>
          )}
        </li>
        <li><a href={PAGE_PATHS['contact']} onClick={(e) => handleLinkClick(e, 'contact')} className={currentPage === 'contact' ? 'active' : ''}>{t.contact}</a></li>
        <li className="mobile-social-icons">
           <a href='https://open.spotify.com/artist/4aPGiD72YUspyHkT368CU9?si=n1oniX1rQMWcr4ry621-jQ' target="_blank"><FaSpotify /></a>
                    <a href='https://music.apple.com/us/artist/aleksi-hakala/1165871624' target="_blank"><SiApplemusic /></a>
                    <a href='https://www.instagram.com/aleksihakalacomposer/' target='_blank'><FaInstagram /></a>
                    <a href='https://www.tiktok.com/@aleksihakalacomposer' target="_blank"><FaTiktok /></a>
                    <a href='https://www.youtube.com/@Aleksi_Hakala' target="_blank"><FaYoutube /></a>
                    <a href='https://soundcloud.com/aleksihakala' target="_blank"><FaSoundcloud /></a>
                    <a href='https://aleksihakala.bandcamp.com/' target="_blank"><FaBandcamp /></a>
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
