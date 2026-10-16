// Sivujen osoitteet yhdessä paikassa.
// Jokaisella sivulla on oma osoitteensa, jotta linkkejä voi jakaa,
// selaimen takaisin-painike toimii ja Google näkee sivut erillisinä.

export type Page = 'home' | 'about' | 'film-music' | 'video-game-music' | 'contact';

export const SITE_URL = 'https://www.hakalamusic.com';

export const PAGE_PATHS: Record<Page, string> = {
  home: '/',
  about: '/about',
  'film-music': '/film-music',
  'video-game-music': '/video-game-music',
  contact: '/contact',
};

// Selaimen välilehdessä ja hakutuloksissa näkyvä otsikko
export const PAGE_TITLES: Record<string, Record<Page, string>> = {
  en: {
    home: 'Aleksi Hakala - Composer, Musician & Sound Designer',
    about: 'About – Aleksi Hakala',
    'film-music': 'Film Music – Aleksi Hakala',
    'video-game-music': 'Video Game Music – Aleksi Hakala',
    contact: 'Contact – Aleksi Hakala',
  },
  fi: {
    home: 'Aleksi Hakala - Säveltäjä, muusikko ja äänisuunnittelija',
    about: 'Tietoa – Aleksi Hakala',
    'film-music': 'Elokuvamusiikki – Aleksi Hakala',
    'video-game-music': 'Videopelimusiikki – Aleksi Hakala',
    contact: 'Yhteystiedot – Aleksi Hakala',
  },
};

// Päättelee osoitteesta, mikä sivu näytetään.
// Esim. "/about" ja "/about/" -> 'about'. Tuntematon osoite -> etusivu.
export function pageFromPath(pathname: string): Page {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const pages = Object.keys(PAGE_PATHS) as Page[];
  return pages.find((page) => PAGE_PATHS[page] === cleanPath) ?? 'home';
}
