import './Portfolio.css';

interface PortfolioProps {
  language: string;
}

const Portfolio = ({ language }: PortfolioProps) => {
  const translations = {
    en: {
      title: 'My Music',
      albumCover: 'Album Cover',
      latestSingle: 'Latest Single',
      epCover: 'EP Cover',
      recentEP: 'Recent EP',
      livePerformance: 'Live Performance',
      liveSessions: 'Live Sessions'
    },
    fi: {
      title: 'Musiikkini',
      albumCover: 'Albumin Kansi',
      latestSingle: 'Uusin Single',
      epCover: 'EP:n Kansi',
      recentEP: 'Tuore EP',
      livePerformance: 'Live-esitys',
      liveSessions: 'Live-sessiot'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="page">
      <h1>{t.title}</h1>
      <div className="portfolio-grid">
        <div className="portfolio-item">
          <div className="placeholder-image">{t.albumCover}</div>
          <h3>{t.latestSingle}</h3>
        </div>
        <div className="portfolio-item">
          <div className="placeholder-image">{t.epCover}</div>
          <h3>{t.recentEP}</h3>
        </div>
        <div className="portfolio-item">
          <div className="placeholder-image">{t.livePerformance}</div>
          <h3>{t.liveSessions}</h3>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;