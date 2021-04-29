import mongoose from 'mongoose';

interface CommentAttrs {
  userId: string;
  postId: string;
  email: string;
  message: string;
  profileIcon?: any;
  image?: any;
  createdAt: string;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

interface CommentDoc extends mongoose.Document {
  userId: string;
  postId: string;
  email: string;
  message: string;
  profileIcon?: any;
  image?: any;
  createdAt: string;
}

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      //required: true,
    },
    postId: {
      type: String,
      //required: true,
    },
    email: {
      type: String,
      //required: true,
      //unique: true,
    },
    message: {
      type: String,
      required: true,
    },
    profileIcon: {
      type: mongoose.Schema.Types.Mixed,
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
      //required: true,
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

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  'Comment',
  commentSchema
);

export { Comment };
