import { InferSchemaType, model, Schema } from 'mongoose';
import { MongooseID } from '../types/types';

const GoNowPairSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: 'UserProfile',
  },
  location: {},
  goTo: {
    type: String,
  },
  possiblePairs: [{}],
  active: {
    type: Boolean,
  },
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
