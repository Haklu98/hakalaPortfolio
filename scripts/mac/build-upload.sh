#!/bin/bash
set -e

# The site's address. The CloudFront cache is cleared for the distribution that serves this address.
SITE_DOMAIN="www.hakalamusic.com"

echo "Building and uploading React app..."

# Navigate to frontend directory
cd ../../FrontendHakalaMusic

# Fetch the latest releases from Apple Music, Songport and Bandcamp
# (if this fails, the previously fetched releases are used and the build continues)
echo "Fetching latest releases..."
npm run releases

# Build the React application
echo "Building React application..."
npm run build

# Get AWS account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Set bucket name
BUCKET_NAME="${ACCOUNT_ID}-hakala-portfolio-bucket"

echo "Uploading to S3 bucket: $BUCKET_NAME"

# Upload to S3
aws s3 sync dist/ s3://$BUCKET_NAME --delete

# Find the CloudFront distribution by the site's address, not by the bucket:
# an old, unused distribution may point to the same bucket and would be found too.
echo "Finding the CloudFront distribution for $SITE_DOMAIN..."
DIST_IDS=$(aws cloudfront list-distributions --query "DistributionList.Items[?contains(not_null(Aliases.Items, \`[]\`), '$SITE_DOMAIN')].Id" --output text)
DIST_COUNT=$(echo "$DIST_IDS" | wc -w)

if [ -z "$DIST_IDS" ] || [ "$DIST_IDS" = "None" ]; then
    echo "ERROR: No CloudFront distribution found for $SITE_DOMAIN."
    echo "The files were uploaded, but the live site shows the old version until the cache is cleared."
    exit 1
fi

if [ "$DIST_COUNT" -gt 1 ]; then
    echo "ERROR: More than one CloudFront distribution uses $SITE_DOMAIN: $DIST_IDS"
    echo "The files were uploaded, but the cache was not cleared. Clear it by hand:"
    echo "  aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths \"/*\""
    exit 1
fi

echo "Invalidating CloudFront cache ($DIST_IDS)..."
if ! aws cloudfront create-invalidation --distribution-id "$DIST_IDS" --paths "/*"; then
    echo "ERROR: Clearing the CloudFront cache failed (see the message above)."
    echo "The files were uploaded, but the live site shows the old version until the cache is cleared."
    exit 1
fi

echo "Cache invalidation started. The live site updates within a few minutes."
echo "Deployment complete!"
