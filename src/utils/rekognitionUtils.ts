import { DetectTextCommand } from '@aws-sdk/client-rekognition';
import { rekognitionClient } from '../libs/rekognitionClient';

export const recognizeText = async (image) => {
  const params = {
    Image: {
      S3Object: {
        Bucket: process.env.S3_BUCKET,
        Name: image,
      },
    },
  };

  try {
    const data = await rekognitionClient.send(new DetectTextCommand(params));
    const textDetections = data.TextDetections;
    let detectedText;
    textDetections.forEach((text) => {
      if (text.Type === 'LINE') {
        console.log(text.DetectedText);
        detectedText.push(text.DetectedText);
      }
    });
    return detectedText;
  } catch (err) {
    console.log('Error', err);
  }
};
/*test*/
