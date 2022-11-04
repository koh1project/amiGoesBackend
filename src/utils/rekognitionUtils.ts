import {
  DetectTextCommand,
  DetectTextCommandInput,
} from '@aws-sdk/client-rekognition';
import { rekognitionClient } from '../libs/rekognitionClient';

export const recognizeText = async (image: string) => {
  const params: DetectTextCommandInput = {
    Image: {
      Bytes: Buffer.from(image, 'base64'),
    },
  };

  try {
    const data = await rekognitionClient.send(new DetectTextCommand(params));
    const textDetections = data.TextDetections;
    const detectedText = [];
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
