import { InferSchemaType, model, Schema } from 'mongoose';

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

export type TGoNowPair = InferSchemaType<typeof GoNowPairSchema>;

GoNowPairSchema.set('timestamps', true);

const GoNowPairModel = model<TGoNowPair>('GoNowPair', GoNowPairSchema);
export default GoNowPairModel;
