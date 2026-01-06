import './Home.css';

interface HomeProps {
  language: string;
}

const Home = ({ language }: HomeProps) => {
  const translations = {
    en: {
      title: 'Composer, Musician, Sound Designer',
      subtitle: 'The portal to my music and creative soundscapes',
      aboutvideo: 'A little about how I view my music',
      soundengineerdemo: 'Sound Design & Engineering Demo Video',
      soundcloud: 'A taste of my music'
    },
    fi: {
      title: 'Säveltäjä, Muusikko, Äänisuunnittelija',
      subtitle: 'Portaali musiikkiini ja luoviin äänimaisemiini',
      aboutvideo: 'Pieni esittely suhteestani musiikkiin',
      soundengineerdemo: 'Äänisuunnittelu & Äänitekninen Demovideo',
      soundcloud: 'Esimakua musiikistani'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="page-home">
      <section className="hero">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <hr className="divider" />
        <div className="videosection">
          <div className="videocontainer">
            <p>{t.aboutvideo}</p>
            <iframe 
              src="https://www.youtube.com/embed/oL0Wyt2tKPA?si=ndYvJrZf3o7tUAmK" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="videocontainer">
            <p>{t.soundengineerdemo}</p>
            <iframe 
              src="https://www.youtube.com/embed/y8U7Q8nNnXo?si=yA-c__-67L6LiaZ-" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="soundcloud-section">
          <div className="soundcloud-embed">
          <p>{t.soundcloud}</p>
          <iframe 
            width="100%" 
            height="450" 
            scrolling="no" 
            frameBorder="no" 
            allow="autoplay" 
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2170270124&color=%23121212&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
          <div className="soundcloud-attribution">
            <a href="https://soundcloud.com/aleksihakala" title="Aleksi Hakala" target="_blank">
              Aleksi Hakala
            </a> · <a href="https://soundcloud.com/aleksihakala/sets/fantasy-rpg-musicpack" title="Fantasy RPG MusicPack" target="_blank">
              Fantasy RPG MusicPack
            </a>
          </div>
        </div>
        </div>
        
        
      </section>
    </div>
  );
};

export default Home;