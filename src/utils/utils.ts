import crypto from 'crypto';

export const uniqueString = (byte = 32) => {
  return crypto.randomBytes(byte).toString('hex');
};
