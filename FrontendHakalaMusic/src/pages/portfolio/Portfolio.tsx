import './Portfolio.css';
import releasesData from '../../data/releases.json';
import { FaSpotify, FaYoutube } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import { useState } from 'react';

interface PortfolioProps {
  language: string;
}

interface DiscographyItemProps {
  release: any;
  isExpanded: boolean;
  onToggle: () => void;
}

const DiscographyItem = ({ release, isExpanded, onToggle }: DiscographyItemProps) => {
  return (
    <div className="discography-item-container">
      <div 
        className="discography-item" 
        onClick={onToggle}
      >
        <span className="release-year">{new Date(release.releaseDate).getFullYear()}</span>
        <span className="release-title">{release.title}</span>
      </div>
      <div className={`discography-links ${isExpanded ? 'expanded' : ''}`}>
        <a href={release.streamingLinks.spotify} target="_blank" rel="noopener noreferrer">
          <FaSpotify />
        </a>
        <a href={release.streamingLinks.applemusic} target="_blank" rel="noopener noreferrer">
          <SiApplemusic />
        </a>
        <a href={release.streamingLinks.youtube} target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

const Portfolio = ({ language }: PortfolioProps) => {
  const translations = {
    en: {
      title: 'My Music',
      latestRelease: 'Latest Release',
      latestAlbum: 'Latest Album',
      discography: 'Discography',
      albums: 'Albums',
      singles: 'Singles'
    },
    fi: {
      title: 'Musiikkini',
      latestRelease: 'Uusin Julkaisu',
      latestAlbum: 'Uusin Albumi',
      discography: 'Diskografia',
      albums: 'Albumit',
      singles: 'Singlet'
    }
  };

  const t = translations[language as keyof typeof translations];

  const sortedReleases = releasesData.sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  const latestRelease = sortedReleases[0];
  const latestAlbum = sortedReleases.find(release => release.Type === 'Album');
  
  const albums = sortedReleases.filter(release => release.Type === 'Album');
  const singles = sortedReleases.filter(release => release.Type === 'Single');
  
  const [expandedId, setExpandedId] = useState<number | null>(null);



  return (
    <div className="page">
      <h1>{t.title}</h1>
      
      <section className="featured-release">
        <h2>{t.latestRelease}</h2>
        <div className="release-showcase">
          <img src={latestRelease.coverImage} alt={latestRelease.title} />
          <div className="release-info">
            <h3>{latestRelease.title}</h3>
            {latestRelease.Description && (
              <p className="description">{latestRelease.Description[language as keyof typeof latestRelease.Description]}</p>
            )}
            <div className="streaming-links">
              <a href={latestRelease.streamingLinks.spotify} target="_blank" rel="noopener noreferrer">
                <FaSpotify />
              </a>
              <a href={latestRelease.streamingLinks.applemusic} target="_blank" rel="noopener noreferrer">
                <SiApplemusic />
              </a>
              <a href={latestRelease.streamingLinks.youtube} target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </section>

      {latestAlbum && (
        <section className="featured-album">
          <h2>{t.latestAlbum}</h2>
          <div className="release-showcase">
            <img src={latestAlbum.coverImage} alt={latestAlbum.title} />
            <div className="release-info">
              <h3>{latestAlbum.title}</h3>
              {latestAlbum.Description && (
                <p className="description">{latestAlbum.Description[language as keyof typeof latestAlbum.Description]}</p>
              )}
              <div className="streaming-links">
                <a href={latestAlbum.streamingLinks.spotify} target="_blank" rel="noopener noreferrer">
                  <FaSpotify />
                </a>
                <a href={latestAlbum.streamingLinks.applemusic} target="_blank" rel="noopener noreferrer">
                  <SiApplemusic />
                </a>
                <a href={latestAlbum.streamingLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="discography">
        <h2>{t.discography}</h2>
        
        <div className="discography-section">
          <h3>{t.albums}</h3>
          <div className="discography-list">
            {albums.map((release) => (
              <DiscographyItem 
                key={release.id} 
                release={release} 
                isExpanded={expandedId === release.id}
                onToggle={() => setExpandedId(expandedId === release.id ? null : release.id)}
              />
            ))}
          </div>
        </div>
        
        <div className="discography-section">
          <h3>{t.singles}</h3>
          <div className="discography-list">
            {singles.map((release) => (
              <DiscographyItem 
                key={release.id} 
                release={release} 
                isExpanded={expandedId === release.id}
                onToggle={() => setExpandedId(expandedId === release.id ? null : release.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;