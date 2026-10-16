// Hakee julkaisusi automaattisesti ja tallentaa ne tiedostoon src/data/releases.generated.json.
//
//   Apple (iTunes-haku) -> kaikki julkaisut: nimi, kansikuva, julkaisupäivä, tyyppi ja Apple Music -linkki
//   Songport            -> saman julkaisun linkit muihin palveluihin (Spotify, YouTube Music, Deezer, Tidal)
//   Bandcamp            -> linkit omalta Bandcamp-sivultasi nimen perusteella
//
// Apple ja Bandcamp ovat julkisia, eivätkä ne vaadi tunnuksia. Songport vaatii API-avaimen
// (songport.link, käyttöoikeus jonotuslistan kautta). Avain lisätään .env-tiedostoon:
//   SONGPORT_API_KEY=sp_live_...
// Ilman avainta muut palvelut toimivat normaalisti ja puuttuvat linkit voi lisätä käsin
// tiedostossa src/data/music.ts.
//
// Ajo kansiossa FrontendHakalaMusic:  npm run releases
// build-upload-skripti ajaa tämän automaattisesti ennen sivun rakentamista.
// Lisävalinta --refresh hakee myös jo aiemmin tarkistettujen julkaisujen linkit uudelleen.
//
// Jos haku epäonnistuu (verkkohäiriö tms.), aiemmin haetut tiedot jäävät voimaan
// eikä sivun rakentaminen keskeydy.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Apple Music -artistitunnus (music.apple.com/.../artist/aleksi-hakala/TÄMÄ)
export const APPLE_ARTIST_ID = '1165871624';
export const BANDCAMP_URL = 'https://aleksihakala.bandcamp.com';
const OUTPUT_FILE = fileURLToPath(new URL('../src/data/releases.generated.json', import.meta.url));
const COUNTRY = 'FI';
const COVER_SIZE = 640;
// Lyhyt tauko hakujen välissä, ettei Songportin minuuttiraja täyty
const LINK_SERVICE_DELAY_MS = 2000;

// Songportilta pyydettävät palvelut (Apple Music -linkki tulee suoraan Applelta).
// Sivulla näytetään nyt Spotify; muut tallentuvat myöhempää käyttöä varten.
const LINK_PLATFORMS = ['spotify', 'youtubeMusic', 'deezer', 'tidal', 'soundcloud'];

const log = (message) => console.log(`[julkaisut] ${message}`);
const warn = (message) => console.warn(`[julkaisut] HUOM: ${message}`);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = new Error(`${response.status} ${response.statusText} (${new URL(url).hostname})`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// Vertailua varten: "Fall from Grace (Single)" ja "fall from grace" ovat sama julkaisu
export function normalizeTitle(title) {
  return title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\((single|ep|deluxe|remastered)[^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Apple lisää nimen perään " - Single" tai " - EP". Siitä saadaan tyyppi, ja se poistetaan nimestä.
export function parseAppleCollection(item) {
  const suffix = item.collectionName.match(/\s+-\s+(Single|EP)$/i);
  const title = suffix ? item.collectionName.slice(0, suffix.index).trim() : item.collectionName.trim();
  let type = 'album';
  if (suffix) type = suffix[1].toLowerCase() === 'ep' ? 'ep' : 'single';
  else if (/compilation/i.test(item.collectionType ?? '')) type = 'compilation';
  else if (item.trackCount === 1) type = 'single';

  const releaseDate = item.releaseDate ? item.releaseDate.slice(0, 10) : null;
  return {
    id: String(item.collectionId),
    title,
    releaseDate,
    year: releaseDate ? releaseDate.slice(0, 4) : null,
    type,
    trackCount: item.trackCount ?? null,
    // Applen kansikuvan koon voi valita osoitteessa; 640×640 riittää sivulle hyvin
    cover: item.artworkUrl100 ? item.artworkUrl100.replace(/\/\d+x\d+bb\.(jpg|png)$/, `/${COVER_SIZE}x${COVER_SIZE}bb.jpg`) : null,
    appleUrl: item.collectionViewUrl ? item.collectionViewUrl.split('?')[0] : null,
  };
}

export async function getAppleReleases() {
  const params = new URLSearchParams({ id: APPLE_ARTIST_ID, entity: 'album', limit: '200', country: COUNTRY });
  const data = await fetchJson(`https://itunes.apple.com/lookup?${params}`);
  const collections = (data.results ?? []).filter((item) => item.wrapperType === 'collection');

  // Sama julkaisu voi näkyä useaan kertaan (esim. eri versiot) – pidetään yksi
  const unique = new Map();
  for (const release of collections.map(parseAppleCollection)) {
    const key = `${normalizeTitle(release.title)}|${release.releaseDate}`;
    if (!unique.has(key)) unique.set(key, release);
  }
  return [...unique.values()].sort((a, b) => (b.releaseDate ?? '').localeCompare(a.releaseDate ?? ''));
}

export async function getSongportLinks(musicUrl, apiKey) {
  const data = await fetchJson('https://api.songport.link/v1/convert', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: musicUrl, platforms: LINK_PLATFORMS }),
  });
  const links = {};
  for (const [platform, entry] of Object.entries(data.platforms ?? {})) {
    // isSearchFallback tarkoittaa pelkkää hakusivua eikä suoraa linkkiä julkaisuun – ei kelpaa
    if (LINK_PLATFORMS.includes(platform) && entry?.url && entry.isSearchFallback === false) {
      links[platform] = entry.url;
    }
  }
  return links;
}

// Lukee Bandcamp-sivun julkaisulistan. Bandcamp näyttää osan julkaisuista suoraan sivulla
// ja loput sivun sisään piilotettuna listana (data-client-items), joten luetaan molemmat.
export function parseBandcampMusicPage(html, baseUrl = BANDCAMP_URL) {
  const found = new Map();
  const decode = (text) =>
    text
      .replace(/<[^>]*>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&#x27;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();
  const add = (title, href) => {
    if (!title || !href) return;
    const url = href.startsWith('http') ? href : `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`;
    const key = normalizeTitle(title);
    if (key && !found.has(key)) found.set(key, url.split('?')[0]);
  };

  // 1) Sivulla näkyvät julkaisut
  const itemPattern = /<li[^>]*class="[^"]*music-grid-item[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
  for (const [, item] of html.matchAll(itemPattern)) {
    const href = item.match(/<a[^>]*href="([^"]+)"/)?.[1];
    const titleHtml = item.match(/<p[^>]*class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/p>/)?.[1];
    if (titleHtml) {
      // Mahdollinen eri esittäjän nimi on omassa elementissään – jätetään pois
      add(decode(titleHtml.replace(/<span[^>]*artist-override[^>]*>[\s\S]*?<\/span>/g, '')), href);
    }
  }

  // 2) Piilotettu lista
  const clientItems = html.match(/data-client-items="([^"]*)"/)?.[1];
  if (clientItems) {
    try {
      for (const item of JSON.parse(decode(clientItems))) add(item.title, item.page_url);
    } catch {
      warn('Bandcamp-sivun piilotettua listaa ei voitu lukea');
    }
  }

  return found;
}

// Bandcamp-soittimen upottamiseen tarvitaan julkaisun numerotunnus, joka löytyy julkaisun sivulta
export function parseBandcampItem(html) {
  const raw =
    html.match(/<meta[^>]*name="bc-page-properties"[^>]*content="([^"]+)"/)?.[1] ??
    html.match(/<meta[^>]*content="([^"]+)"[^>]*name="bc-page-properties"/)?.[1];
  if (!raw) return null;
  try {
    const props = JSON.parse(raw.replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
    const type = props.item_type === 't' ? 'track' : props.item_type === 'a' ? 'album' : null;
    return type && props.item_id ? { type, id: Number(props.item_id) } : null;
  } catch {
    return null;
  }
}

export async function getBandcampItem(url) {
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (hakalamusic.com release updater)' } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return parseBandcampItem(await response.text());
}

export async function getBandcampReleases() {
  const response = await fetch(`${BANDCAMP_URL}/music`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (hakalamusic.com release updater)' },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return parseBandcampMusicPage(await response.text());
}

async function readPrevious() {
  try {
    return JSON.parse(await readFile(OUTPUT_FILE, 'utf8'));
  } catch {
    return { generatedAt: null, releases: [] };
  }
}

export async function updateReleases({ env = process.env, refresh = false, previous, delayMs = LINK_SERVICE_DELAY_MS } = {}) {
  const appleReleases = await getAppleReleases();
  log(`Apple: ${appleReleases.length} julkaisua`);
  if (appleReleases.length === 0) {
    // Tyhjä tulos on todennäköisemmin häiriö kuin se, että kaikki julkaisut olisivat kadonneet
    warn('Apple ei palauttanut yhtään julkaisua – käytetään aiemmin haettuja tietoja.');
    return null;
  }

  let bandcamp = null;
  try {
    bandcamp = await getBandcampReleases();
    log(`Bandcamp: ${bandcamp.size} julkaisua`);
  } catch (error) {
    warn(`Bandcamp-haku epäonnistui (${error.message}) – Bandcamp-linkit pidetään ennallaan.`);
  }

  const songportKey = env.SONGPORT_API_KEY;
  let songportAvailable = Boolean(songportKey);
  if (!songportKey) {
    log('Songport-avainta ei ole (.env: SONGPORT_API_KEY) – Spotify-linkit otetaan aiemmista tiedoista ja käsin tehdyistä korjauksista.');
  }

  // Aiemmat tiedot löydetään tunnuksella tai, jos sitä ei vielä ole, julkaisun nimellä
  const previousById = new Map(previous.releases.filter((r) => r.id).map((r) => [r.id, r]));
  const previousByTitle = new Map(previous.releases.map((r) => [normalizeTitle(r.title), r]));
  const releases = [];

  for (const release of appleReleases) {
    const old = previousById.get(release.id) ?? previousByTitle.get(normalizeTitle(release.title));
    // Aiemmin löydetyt linkit säilyvät, vaikka jokin palvelu ei tällä kertaa vastaisi
    const links = { ...(old?.links ?? {}) };
    if (release.appleUrl) links.appleMusic = release.appleUrl;
    let linksChecked = old?.id === release.id ? (old?.linksChecked ?? false) : false;

    if ((!linksChecked || refresh) && release.appleUrl && songportAvailable) {
      try {
        Object.assign(links, await getSongportLinks(release.appleUrl, songportKey));
        linksChecked = true;
      } catch (error) {
        if (error.status === 401) {
          songportAvailable = false;
          warn('Songport hylkäsi avaimen (401) – tarkista SONGPORT_API_KEY .env-tiedostosta.');
        } else if (error.status === 429) {
          songportAvailable = false;
          warn('Songportin hakuraja täyttyi (429) – loput julkaisut tarkistetaan seuraavalla kerralla.');
        } else if (error.status === 422) {
          // Songport ei löytänyt vastinetta muista palveluista; ei kysytä turhaan uudelleen
          linksChecked = true;
        } else {
          warn(`Songport ei vastannut julkaisulle "${release.title}" (${error.message}) – yritetään uudelleen ensi kerralla.`);
        }
      }
      if (delayMs > 0 && songportAvailable) await sleep(delayMs);
    }

    const bandcampUrl = bandcamp?.get(normalizeTitle(release.title));
    if (bandcampUrl) links.bandcamp = bandcampUrl;

    // Bandcamp-soittimen tunnus haetaan vain kerran (tai jos Bandcamp-linkki on muuttunut)
    let bandcampItem = old?.bandcampItem ?? null;
    if (links.bandcamp && (refresh || !bandcampItem || old?.links?.bandcamp !== links.bandcamp)) {
      try {
        bandcampItem = (await getBandcampItem(links.bandcamp)) ?? bandcampItem;
      } catch (error) {
        warn(`Bandcamp-soittimen tietoja ei saatu julkaisulle "${release.title}" (${error.message}).`);
      }
    }

    const { appleUrl: _appleUrl, ...data } = release;
    releases.push({ ...data, links, linksChecked, bandcampItem });
  }

  return releases;
}

function printSummary(releases) {
  const mark = (value) => (value ? 'kyllä' : '  –  ');
  log('');
  log('Julkaisu                        Vuosi  Tyyppi  Spotify  Bandcamp  SoundCloud');
  for (const release of releases) {
    log(
      `${release.title.slice(0, 30).padEnd(31)} ${String(release.year ?? '').padEnd(6)} ${String(release.type ?? '').padEnd(7)} ` +
        `${mark(release.links.spotify)}    ${mark(release.links.bandcamp)}     ${mark(release.links.soundcloud)}`,
    );
  }
  log('');
  log('Puuttuvat linkit voi lisätä käsin tiedostossa src/data/music.ts (RELEASE_OVERRIDES).');
}

async function main() {
  // Mahdollinen Songport-avain .env-tiedostosta (tiedosto on vapaaehtoinen)
  try {
    process.loadEnvFile(fileURLToPath(new URL('../.env', import.meta.url)));
  } catch {
    // Ei .env-tiedostoa – jatketaan ilman avainta
  }
  const previous = await readPrevious();
  try {
    const releases = await updateReleases({ refresh: process.argv.includes('--refresh'), previous });
    if (!releases) return;

    const changed = JSON.stringify(releases) !== JSON.stringify(previous.releases);
    if (changed) {
      const output = { generatedAt: new Date().toISOString(), releases };
      await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
      log(`Tallennettu: src/data/releases.generated.json (${releases.length} julkaisua)`);
    } else {
      log('Ei muutoksia edelliseen hakuun.');
    }
    printSummary(releases);
  } catch (error) {
    const reason = error.cause?.code ? `${error.message}: ${error.cause.code}` : error.message;
    warn(`Julkaisujen haku epäonnistui (${reason}) – sivu rakennetaan aiemmin haetuilla tiedoilla.`);
  }
}

// Ajetaan vain, kun tiedosto käynnistetään suoraan (testit voivat tuoda funktiot erikseen)
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  await main();
}
