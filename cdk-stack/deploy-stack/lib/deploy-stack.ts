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

        // Yksityinen säilö: tiedostoja ei voi hakea suoraan S3:sta,
        // vaan ainoastaan CloudFrontin kautta (HTTPS + tietoturvaotsakkeet).
        const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
            bucketName: bucketName,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            enforceSSL: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

// CloudFront Function for redirect (hakalamusic.com -> www.hakalamusic.com)
// Pitää mukana osoitteen ?-osan, esim. mainoslinkkien seurantatunnisteet.
const redirectFunction = new cloudfront.Function(this, 'RedirectFunction', {
    code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;

    if (host === 'hakalamusic.com') {
        var parts = [];
        var params = request.querystring;
        for (var key in params) {
            var param = params[key];
            var values = param.multiValue ? param.multiValue : [param];
            for (var i = 0; i < values.length; i++) {
                parts.push(values[i].value === '' ? key : key + '=' + values[i].value);
            }
        }
        var query = parts.length > 0 ? '?' + parts.join('&') : '';

        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: 'https://www.hakalamusic.com' + request.uri + query }
            }
        };
    }

    return request;
}
    `),
});

        // Tietoturvaotsakkeet: ohjeita, jotka selain saa jokaisen sivun mukana.
        const securityHeaders = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeaders', {
            securityHeadersBehavior: {
                // Selain käyttää tätä sivustoa aina HTTPS-yhteydellä (muistaa sen vuoden)
                strictTransportSecurity: {
                    accessControlMaxAge: cdk.Duration.days(365),
                    includeSubdomains: true,
                    override: true,
                },
                // Muut sivustot eivät voi upottaa tätä sivua omansa sisään (estää klikkaushuijaukset)
                frameOptions: {
                    frameOption: cloudfront.HeadersFrameOption.DENY,
                    override: true,
                },
                contentSecurityPolicy: {
                    contentSecurityPolicy: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'",
                    override: true,
                },
                // Selain ei arvaile tiedostotyyppejä
                contentTypeOptions: { override: true },
                // Ulkoisille sivuille kerrotaan vain, että kävijä tuli hakalamusic.comista
                referrerPolicy: {
                    referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
                    override: true,
                },
            },
        });

        const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
            domainNames: [fullDomain, DOMAIN_NAME],
            certificate: certificate,
            defaultRootObject: 'index.html',
            defaultBehavior: {
                // Origin Access Control: vain tämä CloudFront saa lukea säilöä
                origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                responseHeadersPolicy: securityHeaders,
                functionAssociations: [{
                    function: redirectFunction,
                    eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
                }],
            },
            // Osoitteet kuten /about eivät ole tiedostoja säilössä,
            // joten palautetaan index.html ja sivusto näyttää oikean sivun.
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