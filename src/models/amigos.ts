import { InferSchemaType, model, Schema } from 'mongoose';

const AmigosSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  homeCountry: {
    type: String,
    required: true,
  },
  languages: [String],
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    required: true,
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
      type: Number,
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
      enum: ['male', 'female', 'other'],
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

export type TAmigos = InferSchemaType<typeof AmigosSchema>;

AmigosSchema.set('timestamps', true);

const AmigosModel = model<TAmigos>('Amigos', AmigosSchema);
export default AmigosModel;
