import './Home.css';

interface HomeProps {
  language: string;
}

const Home = ({ language }: HomeProps) => {
  const translations = {
    en: {
      title: 'Welcome to experience my Music!',
      subtitle: 'Discover the wonders of music and creativity through a plethora of hand-crafted melodies',
      button: 'Listen Now'
    },
    fi: {
      title: 'Tervetuloa meikäläisen musan pariin!',
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