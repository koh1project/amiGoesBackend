import { InferSchemaType, model, Schema } from 'mongoose';
import { MongooseID } from '../types/types';

const NotificationSchema = new Schema({
  sender: {
    type: String,
    required: true,
    ref: 'Amigos',
  },
  receiver: {
    type: String,
    required: true,
    ref: 'Amigos',
  },
  notificationType: {
    type: String,
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

export type TNotification = MongooseID &
  InferSchemaType<typeof NotificationSchema>;

NotificationSchema.set('timestamps', true);

const NotificationModel = model<TNotification>(
  'Notifications',
  NotificationSchema,
);
export default NotificationModel;
