import { FaSpotify, FaInstagram, FaTiktok, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">    
      <div className="footer-bottom">
        <div className="footer-brand">
          <p>Experience the wonders of music</p>
        </div>
        <p>&copy; 2025 Aleksi Hakala. All rights reserved.</p>
        <div className="footer-social">
          <a href='https://open.spotify.com/artist/4aPGiD72YUspyHkT368CU9?si=n1oniX1rQMWcr4ry621-jQ' target="_blank"><FaSpotify /></a>
                    <a href='https://music.apple.com/us/artist/aleksi-hakala/1165871624' target="_blank"><SiApplemusic /></a>
                    <a href='https://www.instagram.com/aleksihakalacomposer/' target='_blank'><FaInstagram /></a>
                    <a href='https://www.tiktok.com/@aleksihakalacomposer' target="_blank"><FaTiktok /></a>
                    <a href='https://www.youtube.com/@Aleksi_Hakala' target="_blank"><FaYoutube /></a>
                    <a href='https://soundcloud.com/aleksihakala' target="_blank"><FaSoundcloud /></a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;