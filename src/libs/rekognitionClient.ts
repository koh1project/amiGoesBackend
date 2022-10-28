import { RekognitionClient } from '@aws-sdk/client-rekognition';
import { REGION } from './s3Client';

//Create an Amazon Rekognition service client object.

export const rekognitionClient = new RekognitionClient({
  region: REGION,
});
