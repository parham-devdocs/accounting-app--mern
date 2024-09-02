import UserModel from "../models/users.js";
import bcrypt from "bcrypt"; // Make sure to install bcrypt
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { Username, Password, Confirm, Email } = req.body;

  const userAvailability = await UserModel.findOne({ email: Email });
  if (userAvailability) {
    return res.status(409).json({ message: "user already exists" });
  }
  const hashedPassword = await bcrypt.hash(Password, 10);

  try {
    const user = new UserModel({
      username: Username,
      password: hashedPassword,
      email: Email,
    });
    const newUser = await user.save();
    const token = jwt.sign({ email: Email }, process.env.Secret_Key, {
      expiresIn: "1h",
    });
    res.status(201).send({
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { Username, Password, Confirm, Email } = req.body;

  try {
    const user = await UserModel.findOne({ email: Email });

    if (!user) {
      return res.status(422).json({ message: "user does not exists" });
    }
    const token = jwt.sign({ email: Email }, process.env.Secret_Key, {
      expiresIn: "1h",
    });

    res.status(201).send({
      message: "User found successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
