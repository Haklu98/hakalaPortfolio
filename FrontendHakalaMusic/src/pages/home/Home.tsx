import './Home.css';
import latestImage from '../../assets/latest.jpg';
import { FaSoundcloud, FaSpotify, FaBandcamp } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import type { IconType } from 'react-icons';

interface HomeProps {
  language: string;
}

// Uusin julkaisu yhdessä paikassa: kun julkaiset uuden kappaleen,
// vaihda tähän nimi, kansikuva (assets/latest.jpg), linkit ja Bandcamp-soittimen osoite.
const LATEST_RELEASE: {
  title: string;
  artist: string;
  bandcampPlayer: string;
  bandcampUrl: string;
  links: { service: string; url: string; Icon: IconType; action: 'play' | 'buy' }[];
} = {
  title: 'Chasing Fireflies',
  artist: 'Aleksi Hakala',
  bandcampPlayer: 'https://bandcamp.com/EmbeddedPlayer/track=147936536/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
  bandcampUrl: 'https://aleksihakala.bandcamp.com/track/chasing-fireflies',
  links: [
    { service: 'Spotify', url: 'https://open.spotify.com/track/59PGZ8c3T6ZLJ6YjyWd3iz?si=ba7a601ad70c4c14', Icon: FaSpotify, action: 'play' },
    { service: 'Apple Music', url: 'https://music.apple.com/us/song/chasing-fireflies/1869885643', Icon: SiApplemusic, action: 'play' },
    { service: 'Bandcamp', url: 'https://aleksihakala.bandcamp.com/track/chasing-fireflies', Icon: FaBandcamp, action: 'buy' },
    { service: 'SoundCloud', url: 'https://soundcloud.com/aleksihakala/chasing-fireflies', Icon: FaSoundcloud, action: 'play' },
  ],
};

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

  return (
    <div className="page-home">
      <section className="hero">
        <h1>{t.title}</h1>
        <p className="hero-subtitle">{t.subtitle}</p>
        <hr className="divider" />
        <p className="hero-intro">{t.introduction}</p>
      </section>

      {/* Uusin julkaisu: kansikuva vasemmalla, nimi ja kuuntelulinkit oikealla */}
      <section className="release" aria-labelledby="release-title">
        <div className="release-cover">
          <img src={latestImage} alt={`${t.coverAlt}: ${LATEST_RELEASE.title}`} />
        </div>
        <div className="release-info">
          <p className="release-label">{t.latest}</p>
          <h2 id="release-title" className="release-title">{LATEST_RELEASE.title}</h2>
          <p className="release-artist">{LATEST_RELEASE.artist}</p>
          <ul className="release-links">
            {LATEST_RELEASE.links.map(({ service, url, Icon, action }) => (
              <li key={service}>
                <a className="release-link" href={url} target="_blank" rel="noopener noreferrer">
                  <Icon className="release-link-icon" aria-hidden="true" />
                  <span className="release-link-service">{service}</span>
                  <span className="release-link-action">{action === 'buy' ? t.buy : t.play}</span>
                </a>
              </li>
            ))}
          </ul>
          <iframe
            className="bandcamp-embed"
            title={`${LATEST_RELEASE.title} – Bandcamp player`}
            src={LATEST_RELEASE.bandcampPlayer}
            seamless
          >
            <a href={LATEST_RELEASE.bandcampUrl}>{LATEST_RELEASE.title} by {LATEST_RELEASE.artist}</a>
          </iframe>
        </div>
      </section>

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
