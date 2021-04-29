import { Request, Response, NextFunction } from "express";
import { Comment } from "../models/commentsModel";
import mongoose from "mongoose";

exports.createComment = async (req: Request, res: Response) => {
  console.log("CREATING COMMENT");
  const { message } = req.body;
  const comment = Comment.build({
    email: req.currentUser!.email,
    message: message,
    userId: req.currentUser!.id,
    postId: req.params.id,
    createdAt: new Date(Date.now()).toString(),
  });
  console.log(comment);
  await comment.save();
  res.status(201).send({ comments: comment || null });
};

exports.getAllComments = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.find();
    res.status(200).send({ comments: comment || null });
  } catch (err) {
    res.status(404).send(`Display all comments went wrong ${err}`);
  }
};

exports.getCommentsByPosts = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.where("postId").equals(postId);

    res.status(200).send({ comments: comments });
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};
