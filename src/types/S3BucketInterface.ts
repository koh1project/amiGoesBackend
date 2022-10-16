import { s3Bucket } from '../libs/s3Client';
const bucketName = s3Bucket;

export default interface S3BucketInterface {
  Bucket: typeof bucketName;
}
