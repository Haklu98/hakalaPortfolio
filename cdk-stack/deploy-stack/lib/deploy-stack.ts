import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { BUCKET_NAME, DOMAIN_NAME, SUBDOMAIN } from '../../constants/index';

export class DeployStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const bucketName = `${this.account}-${BUCKET_NAME}`;
        const fullDomain = `${SUBDOMAIN}.${DOMAIN_NAME}`;

        // Get existing hosted zone
        const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
            domainName: DOMAIN_NAME,
        });

        // Create SSL certificate
        const certificate = new acm.Certificate(this, 'Certificate', {
            domainName: fullDomain,
            subjectAlternativeNames: [DOMAIN_NAME],
            validation: acm.CertificateValidation.fromDns(hostedZone),
        });

        const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
            bucketName: bucketName,
            publicReadAccess: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html', // Changed to index.html for SPA routing
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
            domainNames: [fullDomain, DOMAIN_NAME],
            certificate: certificate,
            defaultBehavior: {
                origin: new origins.S3Origin(websiteBucket),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                },
                {
                    httpStatus: 403,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                },
            ],
        });

        // Create Route53 records
        new route53.ARecord(this, 'AliasRecord', {
            zone: hostedZone,
            recordName: SUBDOMAIN,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
        });

        new route53.ARecord(this, 'ApexRecord', {
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
        });

        new cdk.CfnOutput(this, 'WebsiteURL', {
            value: `https://${fullDomain}`,
            description: 'Website URL with custom domain',
        });

        new cdk.CfnOutput(this, 'ApexURL', {
            value: `https://${DOMAIN_NAME}`,
            description: 'Apex domain URL',
        });

        new cdk.CfnOutput(this, 'CloudFrontURL', {
            value: `https://${distribution.domainName}`,
            description: 'CloudFront distribution URL',
        });
    }
}
