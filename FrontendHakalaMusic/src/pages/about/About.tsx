import './About.css';
import myselfImage from '../../assets/myself.jpeg';
import image2 from '../../assets/ihteni.png';

interface AboutProps {
  language: string;
}

const About = ({ language }: AboutProps) => {
  const translations = {
    en: {
      title: 'About Me',
      text1: "Aleksi Hakala is an Finnish musician, composer, multi-instrumentalist and singer, who has been passionate about music for as long as he can remember. With his diverse skillset and dedication, Aleksi is committed to making a mark in the industry. He is constantly evolving as a composer and an artist, without fear of exploring different genres. With his solo career as HAKALA, he focuses on pop, rock and folk music. On the flipside of the coin, he enjoys creating symphonies and gritty sounds for films, video games and other media.",
      text2: 'The first time he really fell in love with video game music was back in 2006 while playing Kingdom Hearts II. The emotional depth and immersive playfulness blended perfectly with the gameplay, leaving a lasting impression on him. But the true turning point came with Assassin’s Creed II in 2009.',
      text3: 'Aleksi began his musical journey at the age of three when he exclaimed his desire to play the violin. Not soon after he did start his musical studies at the Music School of Lapua, with violin as his main instrument. After a few years he decided to change things up and changed his main instrument to electric guitar, which he had been learning by himself with the help of his father. Over the years Aleksi has expanded his musical skills to include all the band instruments as well as piano, cello and the basics of saxophone.',
      text4: 'Aleksi started experimenting with digital music production all the way back in 2008 when he discovered how Basshunter made his music using FL Studio. The swedish artist was one of the catalysts that pushed Aleksi to start producing music digitally and as of today he records, produces, mixes and masters all his music by himself.',
      headerInstruments: 'The instruments:',
      instruments: 'Violin, Guitar, Bass, Piano, Drums, Cello, Singing, Synthesizer',
      headerSkills: 'Skills and expertise:',
      skills: 'Music Production, Sound Design, Mixing, Mastering, Film Scoring, Audio Post-Production',
      headerEducation: 'Education:',
      education: [
        {
          year: '2023',
          detail: 'Music and Sound for Video Games Course, Jamk University of Applied Sciences, Finland'
        },
        {
          year: '2020-2022',
          detail: 'Musician, Gradia Pop & Jazz Conservatory, Jyväskylä, Finland'
        },
        {
          year: '2005-2017',
          detail: 'Musical Studies( Guitar, Piano, Violin, Music Theory), Music School of Lapua, Finland'
        }
      ],
      photo: 'Artist Photo'
    },
    fi: {
      title: 'Tietoa Minusta',
      text1: 'Aleksi Hakala on suomalainen muusikko, säveltäjä, multi-instrumentalisti ja laulaja, joka on ollut intohimoisesti kiinnostunut musiikista niin kauan kuin hän muistaa. Monipuolisilla taidoillaan ja omistautumisellaan Aleksi on sitoutunut jättämään jälkensä alalle. Hän kehittyy jatkuvasti säveltäjänä ja artistina, pelkäämättä tutkia eri genrejä. Soolourallaan HAKALA-nimellä hän keskittyy pop-, rock- ja folk-musiikkiin. Toisaalta hän nauttii sinfonioiden ja rouheiden äänien luomisesta elokuviin, videopeleihin ja muuhun mediaan.',
      text2: 'Ensimmäinen kerta, kun hän todella rakastui videopelimusiikkiin, oli vuonna 2006 pelatessaan Kingdom Hearts II:ta. Tunnepitoisuus ja mukaansatempaava leikkisyys sulautuivat täydellisesti pelattavuuteen, jättäen pysyvän vaikutuksen häneen. Mutta todellinen käännekohta tuli Assassin’s Creed II:n myötä vuonna 2009.',
      text3: 'Aleksi aloitti matkansa musiikin syövereihin kolmen vuoden ikäisenä, jolloin hän ilmoitti haluavansa soittaa viulua. Pian tämän jälkeen hän aloittikin opintonsa Lapuan Musiikkiopistossa, pääaineenaan viulu. Muutaman vuoden kuluttua hän päätti vaihtaa pääinstrumenttiaan sähkökitaraan, jota hän oli opetellut soittamaan isänsä avustuksella. Vuosien mittaan Aleksi on laajentanut musiikillista osaamistaan sisällyttämään jokaisen bändisoittimen, sekä pianon, sellon ja saksofonin perusteet.',
      text4: 'Aleksi aloitti digitaalisen musiikintuotannon kokeilut jo vuonna 2008, saatuaan selville, että silloinen lempiartisti Basshunter tuotti musiikkinsa käyttäen FL Studiota. Tämä ruotsalainen artisti oli yksi katalyyteista, jotka töytäisivät Aleksin aloittamaan musiikintuotannun digitaalisesti ja nykyään hän äänitää, tuottaa, miksaa ja masteroi kaiken musiikkinsa itse.',
      headerInstruments: 'Instrumentit:',
      instruments: 'Viulu, Kitara, Basso, Piano, Rummut, Laulu, Sello, Syntetisaattori',
      headerSkills: 'Taidot ja Osaaminen:',
      skills: 'Musiikin Tuotanto, Äänisuunnittelu, Miksaus, Masterointi, Elokuvasävellys, Musiikinjälkikäsittely',
      headerEducation: 'Koulutus:',
      education: [
        {
          year: '2023',
          detail: 'Music and Sound for Video Games Course, Jamk'
        },
        {
          year: '2020-2022',
          detail: 'Muusikko, Gradia Pop & Jazz Konservatorio, Jyväskylä'
        },
        {
          year: '2005-2017',
          detail: 'Musiikin perusopinnot (Sähkökitara, Viulu, Piano, Musiikin Teoria), Lapuan Musiikkiopisto'
        }
      ],
      photo: 'Artistin Kuva'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="page-about">
      <section className="hero-banner-about">
      <h1>{t.title}</h1>
      <hr className="divider" />
      <div className="about-content">
        <div className="about-text">
          <p>{t.text1}</p>
          <p>{t.text2}</p>
          <p>{t.text3}</p>
          <p>{t.text4}</p>
          <p>{t.headerInstruments} <strong>{t.instruments}</strong></p>
          <p>{t.headerSkills} <strong>{t.skills}</strong></p>
          <h3>{t.headerEducation}</h3>
          <ul>
            {t.education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.year}:</strong> {edu.detail}
              </li>
            ))}
          </ul>
        </div>
        <div className="about-image">
             <img className="artist-image" src={image2} alt="Ihteni Logo" />
          <img className="artist-image" src={myselfImage} alt={t.photo} />
       
        </div>
      </div>
      </section>
    </div>
  );
};

export default About;