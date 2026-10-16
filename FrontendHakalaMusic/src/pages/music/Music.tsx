import { useEffect, useState } from 'react';
import { FaSpotify, FaBandcamp, FaSoundcloud } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { RELEASES, FILM_WORKS, GAME_WORKS, type Release, type Video } from '../../data/music';
import './Music.css';

interface MusicProps {
  language: string;
}

type Lang = 'en' | 'fi';

// Palvelut siinä järjestyksessä, jossa ne näytetään. Ensimmäinen löytyvä on kansikuvan linkki.
const SERVICES: { key: keyof Release['links']; name: string; Icon: IconType }[] = [
  { key: 'spotify', name: 'Spotify', Icon: FaSpotify },
  { key: 'appleMusic', name: 'Apple Music', Icon: SiApplemusic },
  { key: 'bandcamp', name: 'Bandcamp', Icon: FaBandcamp },
  { key: 'soundcloud', name: 'SoundCloud', Icon: FaSoundcloud },
];

const ReleaseCard = ({ release, lang, coverLabel }: { release: Release; lang: Lang; coverLabel: string }) => {
  // Jos kansikuva ei lataudu (esim. Spotifyn palvelin ei vastaa), näytetään nimiruutu
  const [coverFailed, setCoverFailed] = useState(false);
  const services = SERVICES.filter(({ key }) => release.links[key]);
  const mainLink = services.length > 0 ? release.links[services[0].key] : undefined;
  const meta = [release.type?.[lang], release.year].filter(Boolean).join(', ');

  return (
    <li className="release-card">
      <a className="release-card-cover" href={mainLink} target="_blank" rel="noopener noreferrer">
        {release.cover && !coverFailed ? (
          <img
            src={release.cover}
            alt={`${coverLabel}: ${release.title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setCoverFailed(true)}
          />
        ) : (
          // Ilman kansikuvaa: julkaisun nimi nimiruudun tapaan
          <span className="release-card-placeholder">{release.title}</span>
        )}
      </a>
      <h3 className="release-card-title">{release.title}</h3>
      {meta && <p className="release-card-meta">{meta}</p>}
      <ul className="release-card-links">
        {services.map(({ key, name, Icon }) => (
          <li key={key}>
            <a href={release.links[key]} target="_blank" rel="noopener noreferrer" aria-label={`${release.title}: ${name}`}>
              <Icon aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

const VideoGrid = ({ videos, lang }: { videos: Video[]; lang: Lang }) => (
  <div className="music-video-grid">
    {videos.map((video) => (
      <figure key={video.youtubeId} className="music-video">
        <figcaption>
          <span className="music-video-title">{video.title[lang]}</span>
          {video.note && <span className="music-video-note">{video.note[lang]}</span>}
        </figcaption>
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title[lang]}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </figure>
    ))}
  </div>
);

const Music = ({ language }: MusicProps) => {
  const translations = {
    en: {
      title: 'Music',
      intro: 'Original releases, film music and game music.',
      sections: 'Sections',
      releases: 'Releases',
      film: 'Film music',
      games: 'Game music',
      soundcloud: 'Collection on SoundCloud',
      cover: 'Cover art',
    },
    fi: {
      title: 'Musiikki',
      intro: 'Omat julkaisut, elokuvamusiikki ja pelimusiikki.',
      sections: 'Osiot',
      releases: 'Julkaisut',
      film: 'Elokuvamusiikki',
      games: 'Pelimusiikki',
      soundcloud: 'Kokoelma SoundCloudissa',
      cover: 'Kansikuva',
    },
  };

  const lang: Lang = language === 'fi' ? 'fi' : 'en';
  const t = translations[lang];

  // Vanhat linkit (esim. /film-music) ja pikalinkit vievät suoraan oikeaan osioon
  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView();
    }
  }, []);

  return (
    <div className="page page-music">
      <section className="music-intro">
        <h1>{t.title}</h1>
        <hr className="divider" />
        <p>{t.intro}</p>
        <nav className="music-jump" aria-label={t.sections}>
          <a href="#releases">{t.releases}</a>
          <a href="#film">{t.film}</a>
          <a href="#games">{t.games}</a>
        </nav>
      </section>

      <section id="releases" className="music-section" aria-labelledby="releases-title">
        <h2 id="releases-title">{t.releases}</h2>
        <ul className="release-grid">
          {RELEASES.map((release) => (
            <ReleaseCard key={release.title} release={release} lang={lang} coverLabel={t.cover} />
          ))}
        </ul>

        <div className="music-soundcloud">
          <h3>{t.soundcloud}</h3>
          <iframe
            title="Aleksi Hakala Collection – SoundCloud player"
            loading="lazy"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2183078540&color=%23a8321a&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&theme=dark"
          ></iframe>
          <div className="soundcloud-attribution">
            <a href="https://soundcloud.com/aleksihakala" title="Aleksi Hakala" target="_blank" rel="noopener noreferrer">Aleksi Hakala</a> · <a href="https://soundcloud.com/aleksihakala/sets/aleksi-hakala-collection" title="Aleksi Hakala Collection" target="_blank" rel="noopener noreferrer">Aleksi Hakala Collection</a>
          </div>
        </div>
      </section>

      <section id="film" className="music-section" aria-labelledby="film-title">
        <h2 id="film-title">{t.film}</h2>
        <VideoGrid videos={FILM_WORKS} lang={lang} />
      </section>

      <section id="games" className="music-section" aria-labelledby="games-title">
        <h2 id="games-title">{t.games}</h2>
        <VideoGrid videos={GAME_WORKS} lang={lang} />
      </section>
    </div>
  );
};

export default Music;
