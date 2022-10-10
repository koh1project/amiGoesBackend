var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blocked = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Amigos'
  },
  blockedUserID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Amigos'
  },
  createdAt: {
    type: Date
  }
});

Blocked.set('timestamps', true);

module.exports = mongoose.model('Blocked', Blocked);