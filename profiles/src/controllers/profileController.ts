import { Request, Response, NextFunction } from "express";
import { Profile } from "../model/profileModel";
import { BadRequestError } from "@lmportal/common";

exports.createProfile = async (req: Request, res: Response) => {
  console.log("CREATING PROFILE");
  const {
    firstName,
    lastName,
    message,
    age,
    birthDate,
    profilePhoto,
    hobbys,
    interests,
    hometown,
    school,
    profession,
    socialStatus,
    phoneNumber,
  } = req.body;

  const existingProfile = await Profile.findOne({
    userId: req.currentUser!.id,
  });

  if (existingProfile) {
    throw new BadRequestError("Profile already created");
  }

  const profile = Profile.build({
    email: req.currentUser!.email,
    firstName: firstName,
    lastName: lastName,
    age: age,
    birthDate: birthDate,
    message: message,
    profilePhoto: profilePhoto,
    createdAt: new Date(Date.now()).toString(),
    hobbys: hobbys,
    interests: interests,
    hometown: hometown,
    school: school,
    profession: profession,
    socialStatus: socialStatus,
    phoneNumber: phoneNumber,
    userId: req.currentUser!.id,
  });

  console.log(profile);

  await profile.save();

  res.status(201).send({ profile: profile || null });
};

exports.getAllProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProfiles = await Profile.find();
    res.status(200).send({ profiles: allProfiles || null });
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};

exports.getProfileByUserId = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.where("userId").equals(req.params.id);

    res.status(200).send({ profile: profile });
  } catch (err) {
    res.status(404).send(`ERRROR! ${err}`);
  }
};

exports.getProfileByEmail = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.where("email").equals(req.params.email);
    res.status(200).send({ profile: profile || null });
  } catch (err) {
    res.status(404).send(`ERROR! ${err}`);
  }
};

exports.patchProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({ profile: profile || null });
  } catch (err) {
    res.status(404).send(`ERROR! ${err}`);
  }
};
