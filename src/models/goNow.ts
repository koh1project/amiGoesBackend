import { InferSchemaType, model, Schema } from 'mongoose';

const goNowPair = new Schema({
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

type goNowPair = InferSchemaType<typeof goNowPair>;

goNowPair.set('timestamps', true);

export default model('GoNowPair', goNowPair);
