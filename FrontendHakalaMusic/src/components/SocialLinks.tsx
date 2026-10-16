import { FaSpotify, FaInstagram, FaTiktok, FaYoutube, FaSoundcloud, FaBandcamp } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import type { IconType } from 'react-icons';

// Kaikki somelinkit yhdessä paikassa. Näitä käytetään sivun yläosassa,
// mobiilivalikossa ja alatunnisteessa – uusi palvelu lisätään vain tähän listaan.
const SOCIAL_LINKS: { name: string; url: string; Icon: IconType }[] = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/4aPGiD72YUspyHkT368CU9?si=n1oniX1rQMWcr4ry621-jQ', Icon: FaSpotify },
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/aleksi-hakala/1165871624', Icon: SiApplemusic },
  { name: 'Instagram', url: 'https://www.instagram.com/aleksihakalacomposer/', Icon: FaInstagram },
  { name: 'TikTok', url: 'https://www.tiktok.com/@aleksihakalacomposer', Icon: FaTiktok },
  { name: 'YouTube', url: 'https://www.youtube.com/@Aleksi_Hakala', Icon: FaYoutube },
  { name: 'SoundCloud', url: 'https://soundcloud.com/aleksihakala', Icon: FaSoundcloud },
  { name: 'Bandcamp', url: 'https://aleksihakala.bandcamp.com/', Icon: FaBandcamp },
];

// aria-label kertoo ruudunlukijalle, mihin palveluun linkki vie
const SocialLinks = () => (
  <>
    {SOCIAL_LINKS.map(({ name, url, Icon }) => (
      <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
        <Icon aria-hidden="true" />
      </a>
    ))}
  </>
);

export default SocialLinks;
