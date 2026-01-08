import './Portfolio.css';
import './VideoGameMusic.css';

interface VideoGameMusicProps {
  language: string;
}

const VideoGameMusic = ({ language }: VideoGameMusicProps) => {
  const translations = {
    en: {
      title: 'Video Game Music',
      text1: 'The collection of my video game music works',
      text2: 'Re-score for Zelda Wind Waker',
      text3: 'Soundtrack for Broforce clip',
      text4: ''
    },
    fi: {
      title: 'Videopelimusiikki',
      text1: 'Kokoelma videopelimusiikkitöistäni',
      text2: 'Sävellys/Re-score Zelda Wind Wakerille',
      text3: 'Soundtrack Broforce-klipille',
      text4: ''
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
          <iframe src="https://www.youtube.com/embed/e4k7d5lmOUQ?si=I16Nc_z1sBjX0dny" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className='videobox'>
            <p>{t.text3}</p>
            <iframe src="https://www.youtube.com/embed/Whe7QFNL1SQ?si=CFY4DqNpFxtrjnbU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoGameMusic;