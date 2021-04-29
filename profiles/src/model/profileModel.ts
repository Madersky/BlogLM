import mongoose from 'mongoose';

interface ProfileAttrs {
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  birthDate: string;
  message: string;
  profilePhoto?: any;
  createdAt: string;
  hobbys: [string];
  interests: [string];
  hometown: string;
  school: string;
  profession: string;
  socialStatus: string;
  phoneNumber: string;
  userId: string;
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

interface ProfileDoc extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  birthDate: string;
  message: string;
  profilePhoto?: any;
  createdAt: string;
  hobbys: [string];
  interests: [string];
  hometown: string;
  school: string;
  profession: string;
  socialStatus: string;
  phoneNumber: string;
  userId: string;
}

const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    createdAt: {
      type: String,
      default: Date.now(),
      select: false,
      required: true,
    },
    age: {
      type: Number,
      requided: false,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    hobbys: {
      type: String,
      required: false,
    },

    interests: {
      type: String,
      required: false,
    },

    hometown: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
    profession: {
      type: String,
      required: false,
    },
    socialStatus: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile(attrs);
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  'Profile',
  profileSchema
);

export { Profile };
