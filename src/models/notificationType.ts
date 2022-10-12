var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationType = new Schema({
  acceptedRequest: {
    message: {
      type: String
    },
    options:
  },
  connectionRequest: {
    message: {
      type: String
    },
    options:
  },
  goNowRequest: {
    message: {
      type: String
    },
    options:
  },
  favoriteSuggestion: {
    message: {
      type: String
    },
    options:
  },
  acceptedGoNowRequest: {
    message: {
      type: String
    },
    options:
  }
});

module.exports = mongoose.model('NotificationType', notificationType);