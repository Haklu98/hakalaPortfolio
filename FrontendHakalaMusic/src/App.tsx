import { useEffect, useState } from 'react';
import Navigation from './components/navigation';
import Footer from './components/footer';
import SocialLinks from './components/SocialLinks';
import Home from './pages/home/Home';
import About from './pages/about/About';
import FilmMusic from './pages/portfolio/FilmMusic';
import VideoGameMusic from './pages/portfolio/VideoGameMusic';
import Contact from './pages/contact/Contact';
import './App.css';
import signatureImage from './assets/NimmariUus.png';
import { PAGE_PATHS, PAGE_TITLES, SITE_URL, pageFromPath, type Page } from './routes';

// Selain muistaa kävijän valitseman kielen seuraavalla käynnillä
const LANGUAGE_KEY = 'hakalamusic-language';

function loadSavedLanguage(): string {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === 'en' || saved === 'fi') return saved;
  } catch {
    // Esim. yksityinen selaus voi estää tallennuksen – käytetään oletuskieltä
  }
  return 'en';
}

function App() {
  // Aloitussivu luetaan osoiteriviltä, esim. /contact avaa suoraan yhteystiedot
  const [currentPage, setCurrentPage] = useState<Page>(() => pageFromPath(window.location.pathname));
  const [language, setLanguage] = useState(loadSavedLanguage);

  useEffect(() => {
    // Siistitään osoite: "/about/" -> "/about", tuntematon osoite -> "/"
    const correctPath = PAGE_PATHS[pageFromPath(window.location.pathname)];
    if (window.location.pathname !== correctPath) {
      window.history.replaceState(null, '', correctPath + window.location.search + window.location.hash);
    }

    // Selaimen takaisin- ja eteenpäin-painikkeet
    const handleBackForward = () => setCurrentPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', handleBackForward);
    return () => window.removeEventListener('popstate', handleBackForward);
  }, []);

  // Päivitetään välilehden otsikko, sivun kieli ja hakukoneille kerrottu osoite
  useEffect(() => {
    const titles = PAGE_TITLES[language] ?? PAGE_TITLES.en;
    document.title = titles[currentPage];
    document.documentElement.lang = language;

    const pageUrl = SITE_URL + PAGE_PATHS[currentPage];
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', pageUrl);
  }, [currentPage, language]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    try {
      localStorage.setItem(LANGUAGE_KEY, lang);
    } catch {
      // Jos tallennus ei onnistu, kieli vaihtuu silti tämän käynnin ajaksi
    }
  };

  // Siirtyy toiselle sivulle ja vaihtaa osoiterivin vastaamaan sitä
  const navigate = (page: Page) => {
    if (page !== currentPage) {
      window.history.pushState(null, '', PAGE_PATHS[page]);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'about': return <About language={language} />;
      case 'film-music': return <FilmMusic language={language} />;
      case 'video-game-music': return <VideoGameMusic language={language} />;
      case 'contact': return <Contact language={language} />;
      default: return <Home language={language} />;
    }
  };

  return (
    <div className="app">
      <div className="hero-banner">
        <div className="social-icons">
          <SocialLinks />
        </div>
        <img src={signatureImage} alt="Aleksi Hakala" className="signature-overlay" />
      </div>
      <Navigation
        currentPage={currentPage}
        onNavigate={navigate}
        language={language}
        setLanguage={changeLanguage}
      />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App
