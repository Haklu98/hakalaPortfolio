import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { BUCKET_NAME } from '../../constants/index';

export class DeployStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const bucketName = `${this.account}-${BUCKET_NAME}`;

        const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
            bucketName: bucketName,
            publicReadAccess: true,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'error.html',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
            defaultBehavior: {
                origin: new origins.S3Origin(websiteBucket),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
        });

        new cdk.CfnOutput(this, 'BucketURL', {
            value: websiteBucket.bucketWebsiteUrl,
            description: 'URL of the S3 bucket hosting the website',
        });

        new cdk.CfnOutput(this, 'CloudFrontURL', {
            value: distribution.domainName,
            description: 'URL of the CloudFront distribution',
        });
    }
}
