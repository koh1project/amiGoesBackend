import {
  CompareFacesCommand,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { REGION } from '../libs/s3Client';

const photo_source = 'Image.jpg';

const client = new RekognitionClient({ region: REGION });

// // function to encode file data to base64 encoded string
// function base64_encode(file) {
//   const bitmap = fs.readFileSync(file);
//   return new Buffer(bitmap).toString('base64');
// }
// const base64str = base64_encode(__dirname + '/Arvind2.jpg');
// // console.log(base64str);

// const myBuffer = Buffer.from(base64str, 'base64');

const params = (image1, image2) => ({
  SourceImage: {
    S3Object: {
      Bucket: process.env.S3_BUCKET,
      Name: image1,
    },
  },
  TargetImage: {
    Bytes: image2,
  },
  SimilarityThreshold: 70,
});

export const compareFaces = async () => {
  // console.log(params);
  const command = new CompareFacesCommand(params(photo_source, myBuffer));
  try {
    const data = await client.send(command);

    let faceMatch;
    if (data.FaceMatches.length > 0) {
      faceMatch = {
        confidence: data.FaceMatches[0].Similarity,
      };
    } else {
      faceMatch = {
        confidence: 0,
      };
    }
    return faceMatch;
  } catch (err) {
    console.log(err);
  }
};
