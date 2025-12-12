import '../styles/Home.css';

interface HomeProps {
  language: string;
}

const Home = ({ language }: HomeProps) => {
  const translations = {
    en: {
      title: 'Welcome to My Music',
      subtitle: 'Discover my musical journey and creative sound',
      button: 'Listen Now'
    },
    fi: {
      title: 'Tervetuloa Musiikkiini',
      subtitle: 'Tutustu musiikilliseen matkaani ja luovaan ääneen',
      button: 'Kuuntele Nyt'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="page home">
      <section className="hero">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <button className="cta-button">{t.button}</button>
      </section>
    </div>
  );
};

export default Home;