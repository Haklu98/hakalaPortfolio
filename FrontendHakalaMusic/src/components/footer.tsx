import { FaSpotify, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <p>Experience the wonders of music</p>
        </div>
        
        <div className="footer-social">
          <FaSpotify />
          <SiApplemusic />
          <FaInstagram />
          <FaTiktok />
          <FaYoutube />
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Aleksi Hakala. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;