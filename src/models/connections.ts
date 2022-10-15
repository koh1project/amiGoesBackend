import { InferSchemaType, model, Schema } from 'mongoose';

const Connections = new Schema({
  userID1: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Amigos',
  },
  userID2: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Amigos',
  },
  isConnected: {
    type: Boolean,
  },
  isPending: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

type Connections = InferSchemaType<typeof Connections>;

Connections.set('timestamps', true);

export default model('Connections', Connections);
