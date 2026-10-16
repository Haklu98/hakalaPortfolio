import { useState, type MouseEvent } from 'react';
import SocialLinks from './SocialLinks';
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

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  // Tavallinen klikkaus vaihtaa sivun lataamatta koko sivustoa uudelleen.
  // Ctrl/Cmd-klikkaus ja hiiren rullaklikkaus avaavat sivun uuteen välilehteen kuten muuallakin.
  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, page: Page) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    handleNavClick(page);
  };

  const translations = {
    en: { 
      home: 'Home', 
      about: 'About', 
      music: 'Music', 
      contact: 'Contact',
      openMenu: 'Open menu',
      closeMenu: 'Close menu'
    },
    fi: { 
      home: 'Koti', 
      about: 'Tietoa', 
      music: 'Musiikki', 
      contact: 'Yhteystiedot',
      openMenu: 'Avaa valikko',
      closeMenu: 'Sulje valikko'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <nav className="navigation">
      <button 
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
        aria-expanded={isMenuOpen}
      >
        <LuMenu size={32} color="#fff" aria-hidden="true" />
      </button>
      
      {isMenuOpen && <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} />}
      
      <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
        <li><a href={PAGE_PATHS['home']} onClick={(e) => handleLinkClick(e, 'home')} className={currentPage === 'home' ? 'active' : ''}>{t.home}</a></li>
        <li><a href={PAGE_PATHS['about']} onClick={(e) => handleLinkClick(e, 'about')} className={currentPage === 'about' ? 'active' : ''}>{t.about}</a></li>
        <li><a href={PAGE_PATHS['music']} onClick={(e) => handleLinkClick(e, 'music')} className={currentPage === 'music' ? 'active' : ''}>{t.music}</a></li>
        <li><a href={PAGE_PATHS['contact']} onClick={(e) => handleLinkClick(e, 'contact')} className={currentPage === 'contact' ? 'active' : ''}>{t.contact}</a></li>
        <li className="mobile-social-icons">
           <SocialLinks />
        </li>
        {/* Kielivalinta: molemmat kielet näkyvillä, valittu korostettuna */}
        <li className="lang-switch" role="group" aria-label="Language / Kieli">
          <button type="button" lang="en" aria-pressed={language === 'en'} className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>
            EN
          </button>
          <span className="lang-switch-divider" aria-hidden="true">/</span>
          <button type="button" lang="fi" aria-pressed={language === 'fi'} className={language === 'fi' ? 'active' : ''} onClick={() => setLanguage('fi')}>
            FI
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
