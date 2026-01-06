import { useState } from 'react';
import Navigation from './components/navigation';
import Footer from './components/footer';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Portfolio from './pages/portfolio/Portfolio';
import FilmMusic from './pages/portfolio/FilmMusic';
import VideoGameMusic from './pages/portfolio/VideoGameMusic';
import Contact from './pages/contact/Contact';
import { FaSpotify, FaInstagram, FaTiktok, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en');

  const renderPage = () => {
    switch(currentPage) {
      case 'about': return <About language={language} />;
      case 'portfolio': return <Portfolio language={language} />;
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
          <a href='https://open.spotify.com/artist/4aPGiD72YUspyHkT368CU9?si=n1oniX1rQMWcr4ry621-jQ' target="_blank"><FaSpotify /></a>
          <a href='https://music.apple.com/us/artist/aleksi-hakala/1165871624' target="_blank"><SiApplemusic /></a>
          <a href='https://www.instagram.com/aleksihakalacomposer/' target='_blank'><FaInstagram /></a>
          <a href='https://www.tiktok.com/@aleksihakalacomposer' target="_blank"><FaTiktok /></a>
          <a href='https://www.youtube.com/@Aleksi_Hakala' target="_blank"><FaYoutube /></a>
          <a href='https://soundcloud.com/aleksihakala' target="_blank"><FaSoundcloud /></a>
        </div>
        <img src="./src/assets/NimmariUus.png" alt="Signature" className="signature-overlay" />
      </div>
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
      />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App
