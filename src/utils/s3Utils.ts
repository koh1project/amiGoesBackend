import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../libs/s3Client';
import { uniqueString } from './utils';

/**
 * Upload an object to s3
 * @param data
 * @returns
 */
export const uploadObject = async (
  data,
  fileName = '',
  bucket = process.env.S3_BUCKET,
) => {
  const name = fileName || uniqueString();
  const bucketParams = {
    Bucket: bucket,
    Key: name,
    Body: data,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    return { key: name, data };
  } catch (err) {
    console.log('Error', err);
  }
};

export const getS3ObjectUrl = async (filename) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: filename,
  };
  const command = new GetObjectCommand(params);

  // 3600 = 1day
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
};
