import { InferSchemaType, model, Schema } from 'mongoose';

const Blocked = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
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

type Blocked = InferSchemaType<typeof Blocked>;

Blocked.set('timestamps', true);

export default model('Blocked', Blocked);
