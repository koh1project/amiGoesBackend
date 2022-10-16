import { InferSchemaType, model, Schema } from 'mongoose';
import { MongooseID } from '../types/types';

const GoNowPairSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserProfile',
  },
  location: {},
  goTo: {
    type: String,
  },
  possiblePairs: [],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export type TGoNowPair = MongooseID & InferSchemaType<typeof GoNowPairSchema>;

GoNowPairSchema.set('timestamps', true);

const GoNowPairModel = model<TGoNowPair>('GoNowPair', GoNowPairSchema);
export default GoNowPairModel;
