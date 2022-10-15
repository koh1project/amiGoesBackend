import { InferSchemaType, model, Schema } from 'mongoose';

const ConnectionsSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
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
    required: true,
  },
  isPending: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export type TConnections = InferSchemaType<typeof ConnectionsSchema>;
ConnectionsSchema.set('timestamps', true);

const ConnectionsModel = model<TConnections>('Connections', ConnectionsSchema);
export default ConnectionsModel;
