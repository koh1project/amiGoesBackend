import { model, Schema } from 'mongoose';

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
});

goNowPair.set('timestamps', true);

export default model('GoNowPair', goNowPair);
