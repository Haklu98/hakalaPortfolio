import SocialLinks from './SocialLinks';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">    
      <div className="footer-bottom">
        <div className="footer-brand">
          <p>Experience the wonders of music</p>
        </div>
        <p>&copy; {new Date().getFullYear()} Aleksi Hakala. All rights reserved.</p>
        <div className="footer-social">
          <SocialLinks />
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;