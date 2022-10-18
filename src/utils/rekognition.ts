import {
  CompareFacesCommand,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';

import { REGION } from '../libs/s3Client';

const photo_source = 'Image.jpg';
const photo_target = 'IMG-3692.jpg';

const client = new RekognitionClient({ region: REGION });

const params = (image1, image2) => ({
  SourceImage: {
    S3Object: {
      Bucket: process.env.S3_BUCKET,
      Name: image1,
    },
  },
  TargetImage: {
    S3Object: {
      Bucket: process.env.S3_BUCKET,
      Name: image2,
    },
  },
  SimilarityThreshold: 70,
});

export const compareFaces = async () => {
  console.log(params);
  const command = new CompareFacesCommand(params(photo_source, photo_target));
  try {
    const data = await client.send(command);
    const confidence = {
      confidence: data.SourceImageFace.Confidence,
    };
    return confidence;
  } catch (err) {
    console.log(err);
  }
};
