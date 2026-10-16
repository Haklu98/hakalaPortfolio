import './Home.css';
import { FaSoundcloud, FaSpotify, FaBandcamp } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { LATEST_RELEASE, type Release } from '../../data/music';

interface HomeProps {
  language: string;
}

const ARTIST = 'Aleksi Hakala';

// Uusin julkaisu tulee automaattisesti samasta listasta kuin Musiikki-sivulla (src/data/music.ts).
// Palvelut siinä järjestyksessä, jossa ne näytetään; Bandcampissa voi ostaa, muissa kuunnella.
const SERVICES: { key: keyof Release['links']; name: string; Icon: IconType; action: 'play' | 'buy' }[] = [
  { key: 'spotify', name: 'Spotify', Icon: FaSpotify, action: 'play' },
  { key: 'appleMusic', name: 'Apple Music', Icon: SiApplemusic, action: 'play' },
  { key: 'bandcamp', name: 'Bandcamp', Icon: FaBandcamp, action: 'buy' },
  { key: 'soundcloud', name: 'SoundCloud', Icon: FaSoundcloud, action: 'play' },
];

const Home = ({ language }: HomeProps) => {
  const translations = {
    en: {
      title: 'Composer, Musician, Sound Designer',
      subtitle: 'The portal to my music and creative soundscapes',
      introduction: 'Hello! I am Aleksi Hakala, an aspiring composer with a passion for film and game music. Welcome to my personal portfolio, where you’ll find all of my composing works and more! My goal is to create immersive and emotionally engaging sounds that evolve and complement the visuals without taking away the magic.',
      aboutvideo: 'A brief introduction to my relationship with music',
      filmmusic: 'My entry for this year’s Indie Film Music Contest',
      latest: 'Latest release',
      play: 'Play',
      buy: 'Buy',
      coverAlt: 'Cover art',
      myworks: 'My latest additions and projects'
    },
    fi: {
      title: 'Säveltäjä, Muusikko, Äänisuunnittelija',
      subtitle: 'Portaali musiikkiini ja luoviin äänimaisemiini',
      introduction: 'Hei! Olen Aleksi Hakala, aloitteleva säveltäjä, jolla on intohimo elokuva- ja pelimusiikkiin. Tervetuloa henkilökohtaiseen portfoliosivustolleni, josta löydät kaikki sävellystyöni!',
      aboutvideo: 'Pieni esittely suhteestani musiikkiin',
      filmmusic: 'Tämän vuoden Indie Film Music Contest -kilpailuun tekemäni sävellys',
      latest: 'Uusin julkaisu',
      play: 'Kuuntele',
      buy: 'Osta',
      coverAlt: 'Kansikuva',
      myworks: 'Viimeisimmät lisäykset ja projektit'
    }
  };

  const t = translations[language as keyof typeof translations];
  // Paikallinen kopio, jotta TypeScript tietää sen olevan olemassa myös listan sisällä
  const release = LATEST_RELEASE;

  return (
    <div className="page-home">
      <section className="hero">
        <h1>{t.title}</h1>
        <p className="hero-subtitle">{t.subtitle}</p>
        <hr className="divider" />
        <p className="hero-intro">{t.introduction}</p>
      </section>

      {/* Uusin julkaisu: kansikuva vasemmalla, nimi ja kuuntelulinkit oikealla */}
      {release && (
        <section className="release" aria-labelledby="release-title">
          {release.cover && (
            <div className="release-cover">
              <img src={release.cover} alt={`${t.coverAlt}: ${release.title}`} referrerPolicy="no-referrer" />
            </div>
          )}
          <div className="release-info">
            <p className="release-label">{t.latest}</p>
            <h2 id="release-title" className="release-title">{release.title}</h2>
            <p className="release-artist">{ARTIST}</p>
            <ul className="release-links">
              {SERVICES.filter(({ key }) => release.links[key]).map(({ key, name, Icon, action }) => (
                <li key={key}>
                  <a className="release-link" href={release.links[key]} target="_blank" rel="noopener noreferrer">
                    <Icon className="release-link-icon" aria-hidden="true" />
                    <span className="release-link-service">{name}</span>
                    <span className="release-link-action">{action === 'buy' ? t.buy : t.play}</span>
                  </a>
                </li>
              ))}
            </ul>
            {release.bandcampPlayer && (
              <iframe
                className="bandcamp-embed"
                title={`${release.title} – Bandcamp player`}
                src={release.bandcampPlayer}
                seamless
              >
                <a href={release.links.bandcamp}>{release.title} by {ARTIST}</a>
              </iframe>
            )}
          </div>
        </section>
      )}

      <section className="works">
        <h2>{t.myworks}</h2>
        <div className="video-grid">
          <figure className="video-item">
            <iframe
              src="https://www.youtube.com/embed/oL0Wyt2tKPA?si=ndYvJrZf3o7tUAmK"
              title={t.aboutvideo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <figcaption>{t.aboutvideo}</figcaption>
          </figure>
          <figure className="video-item">
            <iframe
              src="https://www.youtube.com/embed/ltHlLidpeoo?si=DjTrGN1wyCHVglme"
              title={t.filmmusic}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <figcaption>{t.filmmusic}</figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
};

export default Home;
