var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Connections = new Schema({
  userID1: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserProfile'
  },
  userID2: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserProfile'
  },
  isConnected: {
    type: Boolean
  },
  isPending: {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

Connections.set('timestamps', true);

module.exports = mongoose.model('Connections', Connections);