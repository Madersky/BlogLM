import { Request, Response, NextFunction } from "express";
import { Group } from "../model/groupsModel";

exports.createGroup = async (req: Request, res: Response) => {
  console.log("CREATING GROUP");
  const { name } = req.body;
  try {
    const group = Group.build({
      name: name,
      owner: req.currentUser!.email,
      members: { email: req.currentUser!.email, userId: req.currentUser!.id },
    });
    await group.save();
    console.log(group);
    res.status(200).send({ group: group || null });
  } catch (err) {
    res.status(404).send(`ERROR !!! ${err}`);
  }
};

exports.updatingGroup = async (req: Request, res: Response) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({ group: updatedGroup || null });
  } catch (err) {
    res.status(404).send(`ERROR !!!! ${err}`);
  }
};

exports.getGroupById = async (req: Request, res: Response) => {
  try {
    const group = await Group.where("_id").equals(req.params.id);

    res.status(200).send({ group: group });
  } catch (err) {
    res.status(404).send(`ERRROR! ${err}`);
  }
};

exports.getGroupByUserId = async (req: Request, res: Response) => {
  try {
    const allUserGroups = await Group.aggregate([
      {
        $match: { members: { $elemMatch: { userId: req.params.userId } } },
      },
    ]);
    res.status(200).send({ groups: allUserGroups || null });
  } catch (err) {
    res.status(404).send(`Errror!#!! ${err}`);
  }
};

exports.getAllGroups = async (req: Request, res: Response) => {
  try {
    const allGroups = await Group.find();
    res.status(200).send({ groups: allGroups || null });
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};
