@echo off
setlocal

REM The site's address. The CloudFront cache is cleared for the distribution that serves this address.
set SITE_DOMAIN=www.hakalamusic.com

echo Building and uploading React app...

REM Navigate to frontend directory
cd ..\..\FrontendHakalaMusic

REM Fetch the latest releases from Apple Music, Songport and Bandcamp
REM (if this fails, the previously fetched releases are used and the build continues)
echo Fetching latest releases...
call npm run releases

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

REM Find the CloudFront distribution by the site's address, not by the bucket:
REM an old, unused distribution may point to the same bucket and would be found too.
echo Finding the CloudFront distribution for %SITE_DOMAIN%...
set DIST_ID=
set EXTRA_ID=
for /f "tokens=1,2" %%i in ('aws cloudfront list-distributions --query "DistributionList.Items[?contains(not_null(Aliases.Items, `[]`), '%SITE_DOMAIN%')].Id" --output text') do (
    set DIST_ID=%%i
    set EXTRA_ID=%%j
)

if "%DIST_ID%"=="" goto no_distribution
if "%DIST_ID%"=="None" goto no_distribution
if not "%EXTRA_ID%"=="" goto many_distributions

echo Invalidating CloudFront cache (%DIST_ID%)...
aws cloudfront create-invalidation --distribution-id %DIST_ID% --paths "/*"
if errorlevel 1 goto invalidation_failed

echo Cache invalidation started. The live site updates within a few minutes.
echo Deployment complete!
pause
exit /b 0

:no_distribution
echo ERROR: No CloudFront distribution found for %SITE_DOMAIN%.
echo The files were uploaded, but the live site shows the old version until the cache is cleared.
pause
exit /b 1

:many_distributions
echo ERROR: More than one CloudFront distribution uses %SITE_DOMAIN% (%DIST_ID% and %EXTRA_ID%...).
echo The files were uploaded, but the cache was not cleared. Clear it by hand:
echo   aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
pause
exit /b 1

:invalidation_failed
echo ERROR: Clearing the CloudFront cache failed (see the message above).
echo The files were uploaded, but the live site shows the old version until the cache is cleared.
pause
exit /b 1
