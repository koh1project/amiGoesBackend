import { InferSchemaType, model, Schema } from 'mongoose';

const AmigosSchema = new Schema(
  {
    _id: {
      type: String,
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
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    age: { type: Number },
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
    hobbies: {
      type: [String],
    },
    favorites: {
      type: [String],
    },
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
    connectPreferences: {
      isInvisible: {
        type: Boolean,
      },
      currentLocation: {},
      locationDistance: {
        type: Number,
      },
      gender: [String],
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
      fromTime: {
        type: Number,
      },
      toTime: {
        type: Number,
      },
      activities: [String],
    },
    notificationsOn: {
      type: Boolean,
    },
    notificationsToken: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    virtuals: {
      profilePictureLink: {
        get() {
          return `https://capstoneamigoes.s3.us-west-2.amazonaws.com/${this.profilePicture}`;
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
  },
);

export type TAmigos = InferSchemaType<typeof AmigosSchema>;

AmigosSchema.set('timestamps', true);

const AmigosModel = model<TAmigos>('Amigos', AmigosSchema);
export default AmigosModel;
