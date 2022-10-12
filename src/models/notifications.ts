import { model, Schema } from 'mongoose';

const Notifications = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserProfile',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserProfile',
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
});

Notifications.set('timestamps', true);

export default model('Notifications', Notifications);
