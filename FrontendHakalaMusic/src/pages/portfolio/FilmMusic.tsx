import './Portfolio.css';

interface FilmMusicProps {
  language: string;
}

const FilmMusic = ({ language }: FilmMusicProps) => {
  const translations = {
    en: {
      title: 'Film Music',
      text1: 'The collection of my film music works'
    },
    fi: {
      title: 'Elokuvamusiikki',
      text1: 'Kokoelma elokuvamusiikkitöistäni'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="page">
      <section className="hero-banner-portfolio">
        <h1>{t.title}</h1>
        <hr className="divider" />
        <h3>{t.text1}</h3>
      </section>
    </div>
  );
};

export default FilmMusic;