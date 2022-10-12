import { model, Schema } from 'mongoose';

const Amigos = new Schema({
  name: {
    type: String,
  },
  homeCountry: {
    type: String,
  },
  languages: [String],
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  birthday: {
    type: Date,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  hobbies: [String],
  favorites: [String],
  contact: {
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  emergencyContact: {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    relationship: {
      type: String,
    },
  },
  credentials: {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  connectPreferences: {
    isInvisible: {
      type: Boolean,
    },
    currentLocation: {},
    gender: {
      type: String,
    },
    minAge: {
      type: Number,
    },
    maxAge: {
      type: Number,
    },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
    activities: [String],
  },
  notificationsOn: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

Amigos.set('timestamps', true);

export default model('Amigos', Amigos);
