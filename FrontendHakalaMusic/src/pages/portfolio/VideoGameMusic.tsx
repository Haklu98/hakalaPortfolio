import './Portfolio.css';

interface VideoGameMusicProps {
  language: string;
}

const VideoGameMusic = ({ language }: VideoGameMusicProps) => {
  const translations = {
    en: {
      title: 'Video Game Music',
      text1: 'The collection of my video game music works'
    },
    fi: {
      title: 'Videopelimusiikki',
      text1: 'Kokoelma videopelimusiikkitöistäni'
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

export default VideoGameMusic;