// Musiikki-sivun sisältö yhdessä paikassa.
// Uuden julkaisun tai videon lisääminen: kopioi olemassa oleva rivi ja vaihda tiedot.
// Järjestys sivulla on sama kuin tässä tiedostossa (uusin ensin).

import chasingFirefliesCover from '../assets/latest.jpg';

export interface Release {
  title: string;
  year?: string;                          // esim. '2026'
  type?: { en: string; fi: string };      // esim. { en: 'Single', fi: 'Single' } tai { en: 'Album', fi: 'Albumi' }
  cover?: string;                         // kansikuvan osoite tai tuotu kuva, ks. ohje alla
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

// Kansikuvat: cover on joko Spotifyn kuvaosoite (https://i.scdn.co/image/...)
// tai projektiin tallennettu kuva, joka tuodaan tiedoston alussa kuten chasingFirefliesCover.
// Ilman kansikuvaa, tai jos kuva ei lataudu, julkaisu näkyy tyylikkäänä nimiruutuna.
export const RELEASES: Release[] = [
  {
    title: 'Chasing Fireflies',
    cover: chasingFirefliesCover,
    links: {
      spotify: 'https://open.spotify.com/track/59PGZ8c3T6ZLJ6YjyWd3iz',
      appleMusic: 'https://music.apple.com/us/song/chasing-fireflies/1869885643',
      bandcamp: 'https://aleksihakala.bandcamp.com/track/chasing-fireflies',
      soundcloud: 'https://soundcloud.com/aleksihakala/chasing-fireflies',
    },
  },
  {
    title: 'Beneath the Surface',
    cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273b6c64930609219579e6a865d',
    links: { spotify: 'https://open.spotify.com/album/4VtCGUct2PUxax5LouEJz6' },
  },
  {
    title: 'Gold and Sanguine',
    cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273cf607fc24879231a9b1c1005',
    links: { spotify: 'https://open.spotify.com/album/5GCjU70eNosWM6xg4ekhLm' },
  },
  {
    title: 'Fall from Grace',
    cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b27393518bfd5401c06150c25c5f',
    links: { spotify: 'https://open.spotify.com/album/5IUuX6OOTOHV9dxxBaUHoq' },
  },
  {
    title: 'The Dark Nine',
    cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273c4c3e9426978b5acd5b29343',
    links: { spotify: 'https://open.spotify.com/album/2fdbs8zpuQzNAgHvz7tl57' },
  },
  {
    title: 'Helios',
    cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273be14a53d04c732ca92763e39',
    links: { spotify: 'https://open.spotify.com/album/5fnqy0gY43XjBvnwPqAGxp' },
  },
  {
    title: 'Melodies from a Time Before',
    cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273ba5275281ab96202cbb2a24a',
    links: { spotify: 'https://open.spotify.com/album/3ocjs5Rduf44OpbVpe5g1l' },
  },
  {
    title: 'Stargazing at Night',
    cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b2731cb5fe16d53a325dc53c5667',
    links: { spotify: 'https://open.spotify.com/album/02XbviqWzRfaPELJdpAEPE' },
  },
  {
    title: 'Remember',
    cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273c2e2bbef4375ed91de9c6d4d',
    links: { spotify: 'https://open.spotify.com/album/09ISALmKO0zpwbzxQ2NJb2' },
  },
  {
    title: 'Snow',
    cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273a33bb5987c15daf7f4598118',
    links: { spotify: 'https://open.spotify.com/album/1qheT7QcQ4iZ5TGHp8JTs3' },
  },
  {
    title: 'Electromania',
    cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273e8eced2a19d40a89a906fa9b',
    links: { spotify: 'https://open.spotify.com/album/0H8QJEt1EzjFAlb6PqVztZ' },
  },
];

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
