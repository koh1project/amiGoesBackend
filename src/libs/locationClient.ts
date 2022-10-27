import { Location } from '@aws-sdk/client-location';

export const locationClient = new Location({
  region: 'us-west-2',
});
