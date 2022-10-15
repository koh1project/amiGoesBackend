import { InferSchemaType, model, Schema } from 'mongoose';

const notificationType = new Schema({
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

type notificationType = InferSchemaType<typeof notificationType>;

export default model('NotificationType', notificationType);
