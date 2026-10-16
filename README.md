# Hakala Music Portfolio

Portfolio and marketing site for composer and sound designer Aleksi Hakala, built with React and deployed on AWS with global CDN distribution and a custom domain.

## Pages

- **Home** (`/`) - Introduction, the latest release with streaming and purchase links (picked automatically, see *Updating releases*), Bandcamp player and a selection of work videos
- **About** (`/about`) - Biography
- **Music** (`/music`) - Releases as a cover grid, the SoundCloud collection, film music and game music, with section shortcuts and a "back to top" button. Old `/film-music` and `/video-game-music` links lead to the matching section
- **Contact** (`/contact`) - Mailto link and copy-address button, no third-party form service or API keys

The site is bilingual (English and Finnish) and remembers the visitor's choice.

## Architecture

### Frontend
- **React + TypeScript + Vite** - Modern web application with fast build tooling
- **Responsive Design** - Mobile-first approach for all devices
- **Single Page Application** - Client-side routing with real URLs (`/about`, `/music`, `/contact`)

### AWS Infrastructure
- **S3 Bucket** - Private storage, readable only by CloudFront (Origin Access Control)
- **CloudFront CDN** - Global content delivery with SSL/TLS termination. Page addresses such as `/music` are not files in the bucket, so CloudFront answers them with `index.html` and the app shows the right page
- **Route53** - DNS management with custom domain routing
- **ACM Certificate** - SSL certificate for HTTPS encryption
- **CloudFront Function** - Apex domain redirect (hakalamusic.com → www.hakalamusic.com), keeping the query string (e.g. campaign tracking parameters)

### Infrastructure as Code
- **AWS CDK** - TypeScript-based infrastructure deployment
- **Automated SSL** - DNS validation for certificate provisioning
- **Domain Management** - Both apex and www subdomain support

## Updating releases

Releases are fetched automatically, so a new single normally needs no code changes.

```bash
cd FrontendHakalaMusic
npm run releases            # fetch new releases
npm run releases -- --refresh   # also re-check links of releases fetched earlier
```

The deploy scripts run this step automatically before building. The results are saved to `src/data/releases.generated.json` (do not edit by hand). If fetching fails, the previously fetched releases are used and the build continues.

| Source | What it provides | Needs a key? |
|---|---|---|
| Apple (iTunes lookup) | Every release: title, cover, release date, type, Apple Music link | No |
| Bandcamp | Bandcamp links and player IDs, matched by title | No |
| Songport | Spotify, YouTube Music, Deezer and Tidal links | Yes, optional |

The Songport key goes into `FrontendHakalaMusic/.env` (ignored by git):

```
SONGPORT_API_KEY=sp_live_...
```

Without it, Spotify links come from earlier results and manual corrections.

### Manual corrections (`src/data/music.ts`)

- **`HIDDEN_RELEASES`** - Releases not shown on this site (e.g. Finnish-language HAKALA releases)
- **`RELEASE_OVERRIDES`** - Fix or add details, such as a missing Spotify link. Always wins over fetched data
- **`EXTRA_RELEASES`** - Releases that are not on Apple Music and are therefore not fetched. If one later appears on Apple, it is shown only once: fetched data wins and the manual entry fills in missing links
- **`FEATURED_RELEASE`** - Show a specific release on the front page instead of the newest one (`null` = newest)
- **`FILM_WORKS` / `GAME_WORKS`** - Videos on the Music page, added by hand (YouTube ID and title in both languages)

## Visual identity

- **Colors** - All site colors are variables at the top of `src/index.css` (palette "hiillos": warm near-black, cream text, ember accent). Change them there and the whole site follows
- **Background** - `src/assets/bg.webp`, one 3840 px image used on every screen size. It stays in place while scrolling (`.app::before` in `src/App.css`). Keep the full-size original outside the project; only the converted file is needed
- **Signature** - `src/assets/nimikirjoitus.webp` on the front-page banner, with a sunset gradient. Its glow is set in `src/App.css` (`.signature-overlay`, `filter`)
- **Font** - Jost, self-hosted in `src/assets/fonts` (SIL Open Font License, see `OFL.txt`)

## Deployment

### Prerequisites
- AWS CLI configured
- Node.js and npm installed
- Domain registered in Route53

### Deploy Infrastructure
```bash
cd cdk-stack/deploy-stack
npm install
cdk deploy
```

### Deploy Frontend
Fetches the latest releases, builds the site, uploads it to S3 and clears the CloudFront cache.

Windows (PowerShell):
```powershell
cd FrontendHakalaMusic
npm install
cd ..\scripts\windows
.\build-upload.bat
```

macOS / Linux:
```bash
cd FrontendHakalaMusic && npm install
cd ../scripts/mac && ./build-upload.sh
```

The scripts must be run from their own folder. AWS credentials are needed (`aws configure`).

### Local development
```bash
cd FrontendHakalaMusic
npm run dev       # development server at http://localhost:5173
npm run build     # type check and production build
```

## Domain Configuration

- **Primary Domain**: www.hakalamusic.com
- **Apex Redirect**: hakalamusic.com → www.hakalamusic.com (301 redirect)
- **SSL Certificate**: Covers both domains
- **Global CDN**: CloudFront edge locations worldwide

## Cost Optimization

- S3 static hosting (minimal storage costs)
- CloudFront free tier eligible
- Route53 hosted zone ($0.50/month)
- CloudFront Functions ($0.10 per million requests)
- ACM certificates (free for AWS resources)

## Security Features

- HTTPS-only access (HTTP redirects to HTTPS, HSTS enabled)
- CloudFront security headers: HSTS, frame protection (X-Frame-Options + CSP frame-ancestors), nosniff, referrer policy
- Private S3 bucket: no public access, readable only by the CloudFront distribution, non-HTTPS requests denied
- DNS validation for SSL certificates
- No secrets in the frontend: the optional Songport key is only used at build time and never shipped to the site
