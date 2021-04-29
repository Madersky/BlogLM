import { Request, Response, NextFunction } from "express";

import { Post } from "../models/postModel";

exports.createPost = async (req: Request, res: Response) => {
  console.log("CREATING POST");

  const { message, groupId } = req.body;

  console.log(message, groupId);

  const post = Post.build({
    email: req.currentUser!.email,
    message: message,
    userId: req.currentUser!.id,
    groupId: groupId || "",
    createdAt: new Date(Date.now()).toString(),
  });
  console.log(post);
  await post.save();
  res.status(201).send({ posts: post || null });
};

exports.getAllPostsWithNoGroup = async (req: Request, res: Response) => {
  try {
    const allPost = await Post.where("groupId").equals("");
    res.status(200).send({ posts: allPost || null });
  } catch (err) {
    res.status(404).send(`ERRROR!! ${err}`);
  }
};

exports.getPostsByUserId = async (req: Request, res: Response) => {
  const posts = await Post.where("userId").equals(req.params.id);
  res.status(200).send({ posts: posts || null });
};

exports.getPostsByGroupId = async (req: Request, res: Response) => {
  const posts = await Post.where("groupId").equals(req.params.id);
  res.status(200).send({ posts: posts || null });
};

exports.deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(null);
  } catch (err) {
    res.status(404).send(`ERRROR!! ${err}`);
  }
};

exports.deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(null);
  } catch (err) {
    res.status(404).send(`ERRROR!! ${err}`);
  }
};

exports.updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({ posts: post || null });
  } catch (err) {
    res.status(404).send(`ERRROR!! ${err}`);
  }
};
// exports.aliasExactPost = async (
//   req: Request,
//   res: Response
// ) => {
// };
