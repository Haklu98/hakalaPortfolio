import './Portfolio.css';
import './FilmMusic.css';

interface FilmMusicProps {
  language: string;
}

const FilmMusic = ({ language }: FilmMusicProps) => {
  const translations = {
    en: {
      title: 'Film Music',
      text1: 'The collection of my film music works',
      text2: 'Re-score for Star Wars Order 66 Scene',
      text3: 'Soundscape testing for thriller scene',
      text4: 'More to come!'
    },
    fi: {
      title: 'Elokuvamusiikki',
      text1: 'Kokoelma elokuvamusiikkitöistäni',
      text2: 'Oma sävellys Star Wars Order 66 -kohtaukseen',
      text3: 'Äänimaisematestailua trilleri-kohtaukseen',
      text4: 'Lisää tulossa!'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="page">
      <section className="hero-banner-portfolio">
        <h1>{t.title}</h1>
        <hr className="divider" />
        <h3>{t.text1}</h3>
        <div className='videocontainer'>
          <div className='videobox'>
          <p>{t.text2}</p>
          <iframe src="https://www.youtube.com/embed/d1UwJCHwoUk?si=OHa7A5AC4IOOAZxP" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className='videobox'>
            <p>{t.text3}</p>
            <iframe src="https://www.youtube.com/embed/y7GjUrAq9qM?si=JmekLK0_m6ZfY4ia" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          
        </div>
        <h3>{t.text4}</h3>
      </section>
    </div>
  );
};

export default FilmMusic;