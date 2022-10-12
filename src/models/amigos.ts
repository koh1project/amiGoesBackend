var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Amigos = new Schema({
  name: {
    type: String
  },
  homeCountry: {
    type: String
  },
  languages: ,
  gender: {
    type: String,
    male
    female
    other
  },
  birthday: {
    type: Date
  },
  bio: {
    type: String
  },
  profilePicture: {
    type: String
  },
  isVerified: {
    type: Boolean
  },
  hobbies: ,
  favorites: ,
  contact: {
    phoneNumber: {
      type: String
    },
    email: {
      type: String
    }
  },
  emergencyContact: {
    name: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    relationship: {
      type: String
    }
  },
  credentials: {
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  connectPreferences: {
    isInvisible: {
      type: Boolean
    },
    currentLocation: {},
    gender: {
      type: String
    },
    minAge: {
      type: Number
    },
    maxAge: {
      type: Number
    },
    fromDate: {
      type: Date
    },
    toDate: {
      type: Date
    },
    activities:
  },
  notificationsOn: {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

Amigos.set('timestamps', true);

module.exports = mongoose.model('Amigos', Amigos);

