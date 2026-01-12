# Hakala Music Portfolio

A modern React-based music portfolio website deployed on AWS with global CDN distribution and custom domain support.

## Architecture

### Frontend
- **React + TypeScript + Vite** - Modern web application with fast build tooling
- **Responsive Design** - Mobile-first approach for all devices
- **Single Page Application** - Client-side routing for smooth navigation

### AWS Infrastructure
- **S3 Bucket** - Static website hosting with public read access
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
```bash
cd FrontendHakalaMusic
npm install
npm run build
# Upload build files to S3 bucket
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

- HTTPS-only access (HTTP redirects to HTTPS)
- CloudFront security headers
- S3 bucket policies for secure access
- DNS validation for SSL certificates