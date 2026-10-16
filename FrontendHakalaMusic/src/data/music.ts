// Musiikki-sivun sisältö.
//
// JULKAISUT haetaan automaattisesti Applen julkisesta musiikkihausta (ja muiden palveluiden linkit Songportista ja Bandcampista)
// komennolla `npm run releases`, jonka build-upload-skripti ajaa ennen julkaisua. Haetut tiedot ovat
// tiedostossa releases.generated.json – sitä ei tarvitse muokata käsin.
// Tässä tiedostossa voit piilottaa julkaisuja ja korjata tai täydentää haettuja tietoja.
//
// VIDEOT lisätään käsin: kopioi olemassa oleva rivi ja vaihda tiedot.

import generated from './releases.generated.json';
import chasingFirefliesCover from '../assets/latest.jpg';

export interface Release {
  title: string;
  year?: string;                          // esim. '2026'
  type?: { en: string; fi: string };      // esim. { en: 'Single', fi: 'Single' } tai { en: 'Album', fi: 'Albumi' }
  cover?: string;                         // kansikuvan osoite tai projektiin tuotu kuva
  bandcampPlayer?: string;                // Bandcamp-soittimen osoite (etusivun uusimmalle julkaisulle)
  links: {
    spotify?: string;
    appleMusic?: string;
    bandcamp?: string;
    soundcloud?: string;
  };
}

export interface Video {
  youtubeId: string;                      // YouTube-osoitteen tunnus, esim. youtube.com/watch?v=TÄMÄ
  title: { en: string; fi: string };
  note?: { en: string; fi: string };      // vapaaehtoinen lisätieto, esim. rooli tai kokoonpano
}

// Julkaisut, joita ei näytetä tällä sivulla (esim. suomenkieliset HAKALA-julkaisut).
// Kirjoita nimi täsmälleen kuten se näkyy sivulla.
const HIDDEN_RELEASES: string[] = [
  'Aaltoja',
  'Mikä tää ny on?',
  'Living in the Dream (feat. Aleksi Hakala)',
  '02:20',
  'Tell Me',
];

// Käsin tehdyt korjaukset ja lisäykset. Nämä voittavat aina automaattisen haun.
// Avaimena julkaisun nimi täsmälleen kuten se näkyy sivulla. Esimerkiksi puuttuva linkki:
//   'Helios': { links: { bandcamp: 'https://aleksihakala.bandcamp.com/album/helios' } },
const RELEASE_OVERRIDES: Record<string, Partial<Omit<Release, 'title' | 'links'>> & { links?: Release['links'] }> = {
  'Chasing Fireflies': { cover: chasingFirefliesCover },
  // Spotify-linkit, joita automaattinen haku ei löytänyt (Songport-avainta odotellessa)
  'Yearning': { links: { spotify: 'https://open.spotify.com/album/1hqj66rJI6ekNujTmnh8ix' } },
  '心の痛み / Pain of the Soul': { links: { spotify: 'https://open.spotify.com/album/206F8iz8DM5AhFiaB7kfbB' } },
  'Fog of War': { links: { spotify: 'https://open.spotify.com/album/6xmGMGGdMJ5OshK37eJfVb' } },
  'Hope in the Stars': { links: { spotify: 'https://open.spotify.com/album/17fBDqoKxTyFeOYO3T6yuC' } },
  'Bittersweet Goodbyes': { links: { spotify: 'https://open.spotify.com/album/4TBHmf6KDn1HKelgDOvxOc' } },
};

const TYPE_LABELS: Record<string, { en: string; fi: string }> = {
  single: { en: 'Single', fi: 'Single' },
  ep: { en: 'EP', fi: 'EP' },
  album: { en: 'Album', fi: 'Albumi' },
  compilation: { en: 'Compilation', fi: 'Kokoelma' },
};

interface GeneratedRelease {
  title: string;
  releaseDate: string | null;
  year: string | null;
  type: string | null;
  cover: string | null;
  links: Partial<Record<string, string>>;
  bandcampItem?: { type: string; id: number } | null;
}

function bandcampPlayerUrl(item: GeneratedRelease['bandcampItem']): string | undefined {
  if (!item) return undefined;
  return `https://bandcamp.com/EmbeddedPlayer/${item.type}=${item.id}/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/`;
}

// Julkaisut, joita ei ole Apple Musicissa (automaattinen haku ei siksi löydä niitä). Lisätään käsin.
// releaseDate järjestää julkaisun oikeaan kohtaan muiden joukossa (muoto '2024-05-31').
// type on 'single', 'ep', 'album' tai 'compilation'; null jättää tyypin näyttämättä.
const EXTRA_RELEASES: GeneratedRelease[] = [
  {
    title: 'The Dark Nine',
    releaseDate: '2026-04-02',
    year: '2026',
    type: 'single',
    cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273c4c3e9426978b5acd5b29343',
    links: {
      spotify: 'https://open.spotify.com/album/2fdbs8zpuQzNAgHvz7tl57',
      bandcamp: 'https://aleksihakala.bandcamp.com/track/the-dark-nine',
    },
    bandcampItem: { type: 'track', id: 3427952782 }, // Bandcamp-soittimen tunnus
  },
];

const GENERATED_RELEASES = generated.releases as GeneratedRelease[];

function sameTitle(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

// Kun käsin lisätty julkaisu myöhemmin löytyy myös automaattisesta hausta (esim. ilmestyy Applelle),
// se näytetään vain kerran: haetut tiedot ovat etusijalla, ja käsin lisätyt täydentävät
// puuttuvat kohdat (esim. Spotify-linkin). Rivin voi silloin poistaa EXTRA_RELEASES-listasta, mutta se ei ole pakko.
const ALL_RELEASES: GeneratedRelease[] = [
  ...GENERATED_RELEASES.map((release) => {
    const extra = EXTRA_RELEASES.find((item) => sameTitle(item.title, release.title));
    if (!extra) return release;
    return {
      ...release,
      releaseDate: release.releaseDate ?? extra.releaseDate,
      year: release.year ?? extra.year,
      type: release.type ?? extra.type,
      cover: release.cover ?? extra.cover,
      links: { ...extra.links, ...release.links },
      bandcampItem: release.bandcampItem ?? extra.bandcampItem,
    };
  }),
  ...EXTRA_RELEASES.filter((extra) => !GENERATED_RELEASES.some((release) => sameTitle(release.title, extra.title))),
];

// Uusin ensin; julkaisut ilman päivämäärää listan loppuun
export const RELEASES: Release[] = ALL_RELEASES
  .sort((a, b) => (b.releaseDate ?? '').localeCompare(a.releaseDate ?? ''))
  .filter((release) => !HIDDEN_RELEASES.includes(release.title))
  .map((release) => {
    const override = RELEASE_OVERRIDES[release.title] ?? {};
    return {
      title: release.title,
      year: release.year ?? release.releaseDate?.slice(0, 4) ?? undefined,
      type: release.type ? TYPE_LABELS[release.type] : undefined,
      cover: release.cover ?? undefined,
      bandcampPlayer: bandcampPlayerUrl(release.bandcampItem),
      ...override,
      links: {
        spotify: release.links.spotify,
        appleMusic: release.links.appleMusic,
        bandcamp: release.links.bandcamp,
        soundcloud: release.links.soundcloud,
        ...override.links,
      },
    };
  });

// Etusivun "Uusin julkaisu" on automaattisesti listan uusin.
// Jos haluat nostaa etusivulle jonkin muun, kirjoita sen nimi tähän (esim. 'Helios'); null = uusin.
const FEATURED_RELEASE: string | null = null;

export const LATEST_RELEASE: Release | undefined =
  (FEATURED_RELEASE ? RELEASES.find((release) => release.title === FEATURED_RELEASE) : undefined) ?? RELEASES[0];

export const FILM_WORKS: Video[] = [
  {
    youtubeId: 'ltHlLidpeoo',
    title: { en: 'My entry to Indie Film Music Competition 2026', fi: 'Osallistumiseni Indie Film Music -kilpailuun 2026' },
  },
  {
    youtubeId: 'd1UwJCHwoUk',
    title: { en: 'Re-score for Star Wars Order 66 Scene', fi: 'Oma sävellys Star Wars Order 66 -kohtaukseen' },
  },
  {
    youtubeId: 'y7GjUrAq9qM',
    title: { en: 'Soundscape testing for thriller scene', fi: 'Äänimaisematestailua trilleri-kohtaukseen' },
  },
];

export const GAME_WORKS: Video[] = [
  {
    youtubeId: 'e4k7d5lmOUQ',
    title: { en: 'Re-score for Zelda Wind Waker', fi: 'Sävellys/Re-score Zelda Wind Wakerille' },
  },
  {
    youtubeId: 'Whe7QFNL1SQ',
    title: { en: 'Soundtrack for Broforce clip', fi: 'Soundtrack Broforce-klipille' },
  },
  {
    youtubeId: 'y8U7Q8nNnXo',
    title: { en: 'Sound engineering and composition demo', fi: 'Äänitekninen- ja sävellysdemo' },
  },
];
