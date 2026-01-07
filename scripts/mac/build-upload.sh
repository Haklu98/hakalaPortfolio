#!/bin/bash
set -e

echo "Building and uploading React app..."

# Navigate to frontend directory
cd ../../FrontendHakalaMusic

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

# Get CloudFront distribution ID and invalidate
echo "Getting CloudFront distribution ID..."
DIST_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?contains(Origins.Items[0].DomainName, '$BUCKET_NAME')].Id" --output text)

if [ ! -z "$DIST_ID" ]; then
    echo "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
    echo "Cache invalidated successfully!"
else
    echo "No CloudFront distribution found"
fi

echo "Deployment complete!"