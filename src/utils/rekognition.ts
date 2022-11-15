import {
  CompareFacesCommand,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { REGION } from '../libs/s3Client';

// const photo_source = 'Image.jpg';
// const photo_target = 'IMG-3692.jpg';
const client = new RekognitionClient({ region: REGION });

// // function to encode file data to base64 encoded string
// function base64_encode(file) {
//   const bitmap = fs.readFileSync(file);
//   return new Buffer(bitmap).toString('base64');
// }
// const base64str = base64_encode(__dirname + '/Arvind2.jpg');
// // console.log(base64str);

// const myBuffer = Buffer.from(base64str, 'base64');

// const params = (image1, image2) => ({
//   SourceImage: {
//     S3Object: {
//       Bucket: process.env.S3_BUCKET,
//       Name: image1,
//     },
//   },
//   TargetImage: {
//     Bytes: image2,
//   },
//   SimilarityThreshold: 70,
// });

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
  // const params = {
  //   SourceImage: {
  //     S3Object: {
  //       Bucket: process.env.S3_BUCKET,
  //       Name: 'Image.jpg',
  //     },
  //   },
  //   TargetImage: {
  //     S3Object: {
  //       Bucket: process.env.S3_BUCKET,
  //       Name: 'IMG-3692.jpg',
  //     },
  //   },
  //   SimilarityThreshold: 70,
  // };
  const command = new CompareFacesCommand(params);
  let similarPercent = 0;

  client.send(command).then(
    (data) => {
      data.FaceMatches.forEach((data) => {
        const position = data.Face.BoundingBox;
        const similarity = data.Similarity;
        similarPercent = similarity;
        console.log(
          `The face at: ${position.Left}, ${position.Top} matches with ${similarity}% confidence`,
        );
      });

      if (similarPercent > 90) {
        console.log('Verification successful');
      } else {
        console.log('Verification not successful');
      }
    },
    (err) => {
      console.log('Error', err);
    },
  );
  console.log('Done');
};
