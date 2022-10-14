import { model, Schema } from 'mongoose';
const notificationType = new Schema({
  acceptedRequest: {
    message: {
      type: String,
    },
  },
  connectionRequest: {
    message: {
      type: String,
    },
  },
  goNowRequest: {
    message: {
      type: String,
    },
  },
  favoriteSuggestion: {
    message: {
      type: String,
    },
  },
  acceptedGoNowRequest: {
    message: {
      type: String,
    },
  },
});
export default model('NotificationType', notificationType);
