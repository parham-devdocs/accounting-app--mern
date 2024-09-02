import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
    profileImage: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
