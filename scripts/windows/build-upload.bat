@echo off
setlocal enabledelayedexpansion

echo Building and uploading React app...

REM Navigate to frontend directory
cd ..\..\FrontendHakalaMusic

REM Build the React application
echo Building React application...
call npm run build
if errorlevel 1 (
    echo Build failed!
    pause
    exit /b 1
)

REM Get AWS account ID
for /f "tokens=*" %%i in ('aws sts get-caller-identity --query Account --output text') do set ACCOUNT_ID=%%i

REM Set bucket name
set BUCKET_NAME=%ACCOUNT_ID%-hakala-portfolio-bucket

echo Uploading to S3 bucket: %BUCKET_NAME%

REM Upload to S3
aws s3 sync dist/ s3://%BUCKET_NAME% --delete
if errorlevel 1 (
    echo Upload failed!
    pause
    exit /b 1
)

REM Get CloudFront distribution ID and invalidate
echo Getting CloudFront distribution ID...
for /f "tokens=*" %%i in ('aws cloudfront list-distributions --query "DistributionList.Items[?contains(Origins.Items[0].DomainName, '%BUCKET_NAME%')].Id" --output text') do set DIST_ID=%%i

if not "%DIST_ID%"=="" (
    echo Invalidating CloudFront cache...
    aws cloudfront create-invalidation --distribution-id %DIST_ID% --paths "/*"
    echo Cache invalidated successfully!
) else (
    echo No CloudFront distribution found
)

echo Deployment complete!
pause