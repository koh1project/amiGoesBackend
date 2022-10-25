import { TranslateClient } from '@aws-sdk/client-translate';

import { REGION } from './s3Client';

//Create an Amazon Translate service client object.
export const translateClient = new TranslateClient({
  region: REGION,
});
