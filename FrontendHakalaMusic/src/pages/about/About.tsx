import './About.css';
import myselfImage from '../../assets/myself.jpeg';

interface AboutProps {
  language: string;
}

const About = ({ language }: AboutProps) => {
  const translations = {
    en: {
      title: 'About Me',
      text1: "I'm a passionate musician dedicated to creating meaningful music that connects with people...",
      text2: 'My musical journey began with a love for melody and rhythm, evolving into a unique sound that blends various genres and influences.',
      photo: 'Artist Photo'
    },
    fi: {
      title: 'Tietoa Minusta',
      text1: 'Olen intohimoinen muusikko, joka on omistautunut merkityksellisen musiikin luomiseen, joka yhdistää ihmisiä...',
      text2: 'Musiikillinen matkani alkoi rakkaudesta melodiaan ja rytmiin, kehittyen ainutlaatuiseksi soundiksi, joka yhdistää erilaisia genrejä ja vaikutteita.',
      photo: 'Artistin Kuva'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="page-about">
      <h1>{t.title}</h1>
      <div className="about-content">
        <div className="about-text">
          <p>{t.text1}</p>
          <p>{t.text2}</p>
        </div>
        <div className="about-image">
          <img className="artist-image" src={myselfImage} alt={t.photo} />
        </div>
      </div>
    </div>
  );
};

export default About;