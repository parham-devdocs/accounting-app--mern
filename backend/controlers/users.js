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
  const { Email, Password } = req.body;

  try {
    const user = await UserModel.findOne({ email: Email });
    if (!user) {
      return res.status(422).json({ message: "User does not exist" });
    }

    // Await the comparison to get the result
    const userIsValid = await bcrypt.compare(Password, user.password);
    if (!userIsValid) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: Email }, process.env.Secret_Key, {
      expiresIn: "1h",
    });

    // Use 200 OK status for successful login
    res.status(200).send({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
