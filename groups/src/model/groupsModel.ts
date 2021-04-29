import mongoose from "mongoose";

interface GroupAttrs {
  name: string;
  owner: string;
  members: any;
}

interface GroupModel extends mongoose.Model<GroupDoc> {
  build(attrs: GroupAttrs): GroupDoc;
}

interface GroupDoc extends mongoose.Document {
  name: string;
  owner: string;
  members: any;
  groupPosts: string;
}

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    members: [
      {
        email: {
          type: String,
          required: true,
        },
        userId: {
          type: String,
          required: true,
        },
      },
      {
        toJSON: {
          transform(ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          },
        },
      },
    ],
    groupPosts: [
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
          transform(ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          },
        },
      },
    ],
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

groupSchema.statics.build = (attrs: GroupAttrs) => {
  return new Group(attrs);
};

const Group = mongoose.model<GroupDoc, GroupModel>("Group", groupSchema);

export { Group };
