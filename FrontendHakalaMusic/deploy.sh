#!/bin/bash

# Build the project
npm run build

# Upload to S3 (replace with your bucket name)
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache (optional, replace with your distribution ID)
# aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"