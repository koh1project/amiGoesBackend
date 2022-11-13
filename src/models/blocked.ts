import { InferSchemaType, model, Schema } from 'mongoose';
import { MongooseID } from '../types/types';

const Blocked = new Schema(
  {
    userID: {
      type: String,
      required: true,
      ref: 'Amigos',
    },
    blockedUserID: {
      type: String,
      required: true,
      ref: 'Amigos',
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

type Blocked = MongooseID & InferSchemaType<typeof Blocked>;

Blocked.set('timestamps', true);

export default model('Blocked', Blocked);
