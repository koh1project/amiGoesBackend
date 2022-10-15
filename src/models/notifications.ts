import { InferSchemaType, model, Schema } from 'mongoose';

const NotificationSchema = new Schema({
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

export type TNotification = InferSchemaType<typeof NotificationSchema>;

NotificationSchema.set('timestamps', true);

const NotificationModel = model<TNotification>(
  'Notifications',
  NotificationSchema,
);
export default NotificationModel;
