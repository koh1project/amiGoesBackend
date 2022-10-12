var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goNowPair = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserProfile'
  },
  location: {},
  goTo: {
    type: String
  },
  possiblePairs: ,
  createdAt: {
    type: Date
  }
});

goNowPair.set('timestamps', true);

module.exports = mongoose.model('GoNowPair', goNowPair);