import mongoose from "mongoose";
import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, NotFoundError, errorHandler } from "@lmportal/common";
const app = express();
const groupsRouter = require("./routes/groupsRoutes");

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUser);

app.use("/api/groups", groupsRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://groups-mongo-srv:27017/groups", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongodb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000 ;), groups");
  });
};

start();
