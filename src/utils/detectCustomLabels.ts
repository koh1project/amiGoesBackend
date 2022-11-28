/* eslint-disable prettier/prettier */
import {
  DetectCustomLabelsCommand,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { REGION } from '../libs/s3Client';

const client = new RekognitionClient({ region: REGION });

export const detectCustomLabels = async (image) => {
  console.log('called');
  const buffer = Buffer.from(image, 'base64');
  console.log(buffer);
  const params = {
    Image: {
      Bytes: buffer,
    },
    MinConfidence: 70,
    ProjectVersionArn:
      'arn:aws:rekognition:us-west-2:834021575386:project/amigoesCustomLabels/version/amigoesCustomLabels.2022-10-27T18.35.09/1666920909885',
  };

  const command = new DetectCustomLabelsCommand(params);

  try {
    const data = await client.send(command);

    return data;
    console.log(data);
  } catch (err) {
    console.log('Error', err);
  }
};
