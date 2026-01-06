import './Portfolio.css';

interface PortfolioProps {
  language: string;
}

const Portfolio = ({ language }: PortfolioProps) => {
  const translations = {
    en: {
      title: 'My Music',
      text1: 'The collection of my musical works',
      filmMusic: 'Film Music',
      videoGameMusic: 'Video Game Music'
    },
    fi: {
      title: 'Musiikkini',
      text1: 'Kokoelma musiikkitöistäni',
      filmMusic: 'Elokuvamusiikki',
      videoGameMusic: 'Videopelimusiikki'
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

export default Portfolio;