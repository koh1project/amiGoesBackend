import {
  CompareFacesCommand,
  DetectFacesCommand,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { REGION } from '../libs/s3Client';

const client = new RekognitionClient({ region: REGION });

export const compareFaces = async (SourceImage, TargetImage) => {
  // console.log(params);
  const buffer1 = Buffer.from(SourceImage, 'base64');
  const buffer2 = Buffer.from(TargetImage, 'base64');
  const params = {
    SourceImage: {
      Bytes: buffer1,
    },
    TargetImage: {
      Bytes: buffer2,
    },
    SimilarityThreshold: 70,
  };

  const face1 = new DetectFacesCommand({
    Image: {
      Bytes: buffer1,
    },
  });

  const face2 = new DetectFacesCommand({
    Image: {
      Bytes: buffer2,
    },
  });

  try {
    const face1Data = await client.send(face1);
    const face2Data = await client.send(face2);

    if (
      face1Data.FaceDetails.length === 0 ||
      face2Data.FaceDetails.length === 0
    ) {
      return {
        success: false,
        message: 'No face detected',
        code: 0,
      };
    } else {
      const command = new CompareFacesCommand(params);

      let similarPercent = 0;

      const compare = await client.send(command);
      compare.FaceMatches.forEach((data) => {
        similarPercent = data.Similarity;
      });
      if (similarPercent > 70) {
        return {
          success: true,
          message: 'Face Matched',
          code: 1,
        };
      } else {
        return {
          success: false,
          message: 'Face not matched',
          code: 0,
        };
      }
    }
  } catch (err) {
    console.log('Error', err);
  }
};
