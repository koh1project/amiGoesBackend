import { S3Client } from '@aws-sdk/client-s3';

//S3 Bucket Name
export const s3Bucket = process.env.S3_BUCKET;

// S3 Region
export const REGION = 'us-west-2';

// Create an Amazon S3 service client object.
export const s3Client = new S3Client({ region: REGION });
