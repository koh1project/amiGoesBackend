var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Notifications = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserProfile'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserProfile'
  },
  notificationType: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'notificationType'
  },
  isRead: {
    type: Boolean
  },
  createdAt: {
    type: Date
  }
});

Notifications.set('timestamps', true);

module.exports = mongoose.model('Notifications', Notifications);