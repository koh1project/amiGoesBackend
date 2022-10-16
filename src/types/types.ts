import { Types } from 'mongoose';

export type TGenderValues = 'male' | 'female' | 'other';

// Infer Type Doesn't have ID by default
export type MongooseID = {
  _id: Types.ObjectId;
};
