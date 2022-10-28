import { InferSchemaType, model, Schema } from 'mongoose';
import { MongooseID } from '../types/types';

const Blocked = new Schema({
  userID: {
    type: String,
    required: true,
    ref: 'Amigos',
  },
  blockedUserID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Amigos',
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

type Blocked = MongooseID & InferSchemaType<typeof Blocked>;

Blocked.set('timestamps', true);

export default model('Blocked', Blocked);
