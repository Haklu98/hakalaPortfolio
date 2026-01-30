import './Home.css';
import latestImage from '../../assets/latest.jpg';
import { FaSoundcloud, FaSpotify, FaBandcamp } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';

interface HomeProps {
  language: string;
}

const Home = ({ language }: HomeProps) => {
  const translations = {
    en: {
      title: 'Composer, Musician, Sound Designer',
      subtitle: 'The portal to my music and creative soundscapes',
      introduction: 'Hello! I am Aleksi Hakala, an aspiring composer with a passion for film and game music. Welcome to my personal portfolio, where you´ll find all of my composing works and more! My goal is to create immersive and emotionally engaging sounds that evolve and complement the visuals without taking away the magic.',
      aboutvideo: 'A brief introduction to my relationship with music',
      filmmusic: 'My entry for this years Indie Film Music Contest',
      soundcloud: 'Collection of my music for you to listen to',
      latest: 'Latest Release',
      listen: 'Listen now!',
      myworks: 'My latest additions and projects'
    },
    fi: {
      title: 'Säveltäjä, Muusikko, Äänisuunnittelija',
      subtitle: 'Portaali musiikkiini ja luoviin äänimaisemiini',
      introduction: 'Hei! Olen Aleksi Hakala, aloitteleva säveltäjä, jolla on intohimo elokuva- ja pelimusiikkiin. Tervetuloa henkilökohtaiseen portfoliosivustolleni, josta löydät kaikki sävellystyöni!',
      aboutvideo: 'Pieni esittely suhteestani musiikkiin',
      filmmusic: 'Tämän vuoden Indie Film Music Contest -kilpailuun tekemäni sävellys',
      soundcloud: 'Kokoelma musiikkiani kuunneltavaksi',
      latest: 'Viimeisin julkaisu',
      listen: 'Kuuntele nyt!',
      myworks: 'Viimeisimmät lisäykset ja projektit'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="page-home">
      <section className="hero">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <hr className="divider" />
        <p>{t.introduction}</p>

        <div className='latest-release'>
          <p>{t.latest}</p>
          <div className='release-layout'>
            <div className='music-icons-left'>
              <a href='https://open.spotify.com/track/14uW5vOALXWPd8TzXMLb7j?si=1ebf5ee9502349ee' target="_blank"><FaSpotify /></a>
              <a href='https://music.apple.com/us/album/bittersweet-goodbyes-single/1869184041' target="_blank"><SiApplemusic /></a>
            </div>
            <div className='releaseContainer'>
              <img src={latestImage} alt="Latest Release" />
            </div>
            <div className='music-icons-right'>
              <a href='https://aleksihakala.bandcamp.com/track/bittersweet-goodbyes' target="_blank"><FaBandcamp /></a>
              <a href='https://soundcloud.com/aleksihakala/bittersweet-goodbyes' target="_blank"><FaSoundcloud /></a>
            </div>
          </div>
          <p>{t.listen}</p>
          <div className='music-icons-mobile'>
            <a href='https://open.spotify.com/track/14uW5vOALXWPd8TzXMLb7j?si=1ebf5ee9502349ee' target="_blank"><FaSpotify /></a>
            <a href='https://music.apple.com/us/album/bittersweet-goodbyes-single/1869184041' target="_blank"><SiApplemusic /></a>
            <a href='https://aleksihakala.bandcamp.com/track/bittersweet-goodbyes' target="_blank"><FaBandcamp /></a>
            <a href='https://soundcloud.com/aleksihakala/bittersweet-goodbyes' target="_blank"><FaSoundcloud /></a>
          </div>
        </div>
      <hr className="divider" />
        <h2>{t.myworks}</h2>
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
            <p>{t.filmmusic}</p>
            <iframe 
              src="https://www.youtube.com/embed/ltHlLidpeoo?si=DjTrGN1wyCHVglme" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="soundcloud-section">
          <h2>{t.soundcloud}</h2>
          <div className="soundcloud-embed">
            <iframe 
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2183078540&color=%238d0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&theme=dark"
            ></iframe>
            <div className="soundcloud-attribution">
              <a href="https://soundcloud.com/aleksihakala" title="Aleksi Hakala" target="_blank">Aleksi Hakala</a> · <a href="https://soundcloud.com/aleksihakala/sets/aleksi-hakala-collection" title="Aleksi Hakala Collection" target="_blank">Aleksi Hakala Collection</a>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  );
};

export default Home;