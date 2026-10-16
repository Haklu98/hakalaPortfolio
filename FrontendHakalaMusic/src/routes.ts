// Sivujen osoitteet yhdessä paikassa.
// Jokaisella sivulla on oma osoitteensa, jotta linkkejä voi jakaa,
// selaimen takaisin-painike toimii ja Google näkee sivut erillisinä.

export type Page = 'home' | 'about' | 'music' | 'contact';

export const SITE_URL = 'https://www.hakalamusic.com';

export const PAGE_PATHS: Record<Page, string> = {
  home: '/',
  about: '/about',
  music: '/music',
  contact: '/contact',
};

// Vanhat osoitteet ajalta, jolloin elokuva- ja pelimusiikki olivat omilla sivuillaan.
// Jo jaetut linkit vievät nyt Musiikki-sivun oikeaan kohtaan.
export const LEGACY_PATHS: Record<string, string> = {
  '/film-music': '/music#film',
  '/video-game-music': '/music#games',
};

// Selaimen välilehdessä ja hakutuloksissa näkyvä otsikko
export const PAGE_TITLES: Record<string, Record<Page, string>> = {
  en: {
    home: 'Aleksi Hakala - Composer, Musician & Sound Designer',
    about: 'About – Aleksi Hakala',
    music: 'Music – Aleksi Hakala',
    contact: 'Contact – Aleksi Hakala',
  },
  fi: {
    home: 'Aleksi Hakala - Säveltäjä, muusikko ja äänisuunnittelija',
    about: 'Tietoa – Aleksi Hakala',
    music: 'Musiikki – Aleksi Hakala',
    contact: 'Yhteystiedot – Aleksi Hakala',
  },
};

function cleanPath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

// Päättelee osoitteesta, mikä sivu näytetään.
// Esim. "/about" ja "/about/" -> 'about', "/film-music" -> 'music'. Tuntematon osoite -> etusivu.
export function pageFromPath(pathname: string): Page {
  const path = cleanPath(pathname);
  const legacy = LEGACY_PATHS[path];
  const target = legacy ? legacy.split('#')[0] : path;
  const pages = Object.keys(PAGE_PATHS) as Page[];
  return pages.find((page) => PAGE_PATHS[page] === target) ?? 'home';
}

// Jos osoite on vanha, palauttaa uuden osoitteen (esim. "/music#film"), muuten null.
export function legacyRedirect(pathname: string): string | null {
  return LEGACY_PATHS[cleanPath(pathname)] ?? null;
}

// Siistii osoiterivin: "/about/" -> "/about", tuntematon osoite -> "/",
// vanha "/film-music" -> "/music#film". Ei lisää selaimen historiaan uutta riviä.
export function normalizeCurrentAddress(): void {
  const { pathname, search, hash } = window.location;
  const redirect = legacyRedirect(pathname);
  if (redirect) {
    const [path, section] = redirect.split('#');
    window.history.replaceState(null, '', `${path}${search}#${section}`);
    return;
  }
  const correctPath = PAGE_PATHS[pageFromPath(pathname)];
  if (pathname !== correctPath) {
    window.history.replaceState(null, '', correctPath + search + hash);
  }
}
