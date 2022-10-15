import { InferSchemaType, model, Schema } from 'mongoose';

const Notifications = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Amigos',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Amigos',
  },
  notificationType: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'notificationType',
  },
  isRead: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

type Notifications = InferSchemaType<typeof Notifications>;

Notifications.set('timestamps', true);

export default model('Notifications', Notifications);
