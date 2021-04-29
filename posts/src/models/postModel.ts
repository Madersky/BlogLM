import mongoose from "mongoose";

interface PostAttrs {
  email: string;
  message: string;
  userId: string;
  profileIcon?: any;
  image?: any;
  createdAt: string;
  groupId: string;
}

interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

interface PostDoc extends mongoose.Document {
  email: string;
  message: string;
  userId: string;
  profileIcon?: any;
  image?: any;
  createdAt: string;
  groupId: string;
}

const postSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      //unique: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    profileIcon: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    groupId: {
      type: String,
      required: false,
    },
    image: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    createdAt: {
      type: String,
      default: Date.now(),
      select: false,
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

postSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
