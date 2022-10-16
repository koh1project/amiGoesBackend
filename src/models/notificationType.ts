import { InferSchemaType, model, Schema } from 'mongoose';
import { MongooseID } from '../types/types';

const NotificationTypeSchema = new Schema({
  acceptedRequest: {
    message: {
      type: String,
    },
    options: {
      type: [String],
    },
  },
  connectionRequest: {
    message: {
      type: String,
    },
    options: {
      type: [String],
    },
  },
  goNowRequest: {
    message: {
      type: String,
    },
    options: {
      type: [String],
    },
  },
  favoriteSuggestion: {
    message: {
      type: String,
    },
    options: {
      type: [String],
    },
  },
  acceptedGoNowRequest: {
    message: {
      type: String,
    },
    options: {
      type: [String],
    },
  },
});

export type TNotificationType = MongooseID &
  InferSchemaType<typeof NotificationTypeSchema>;
const NotificationTypeModel = model<TNotificationType>(
  'NotificationType',
  NotificationTypeSchema,
);

export default NotificationTypeModel;
