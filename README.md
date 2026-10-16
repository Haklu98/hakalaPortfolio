# Hakala Music Portfolio

A modern React-based music portfolio website deployed on AWS with global CDN distribution and custom domain support.

## Architecture

### Frontend
- **React + TypeScript + Vite** - Modern web application with fast build tooling
- **Responsive Design** - Mobile-first approach for all devices
- **Single Page Application** - Client-side routing with real URLs (`/about`, `/film-music`, `/video-game-music`, `/contact`)
- **Bilingual** - English and Finnish, the visitor's choice is remembered
- **Contact** - Mailto link and copy-address button, no third-party form service or API keys

### AWS Infrastructure
- **S3 Bucket** - Private storage, readable only by CloudFront (Origin Access Control)
- **CloudFront CDN** - Global content delivery with SSL/TLS termination
- **Route53** - DNS management with custom domain routing
- **ACM Certificate** - SSL certificate for HTTPS encryption
- **CloudFront Function** - Apex domain redirect (hakalamusic.com → www.hakalamusic.com)

### Infrastructure as Code
- **AWS CDK** - TypeScript-based infrastructure deployment
- **Automated SSL** - DNS validation for certificate provisioning
- **Domain Management** - Both apex and www subdomain support

## Use Case

This project serves as a professional music portfolio website featuring:
- Artist showcase and biography
- Music streaming and downloads
- Performance gallery and media
- Contact information and booking details
- SEO-optimized content delivery

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
Builds the site, uploads it to S3 and clears the CloudFront cache.

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