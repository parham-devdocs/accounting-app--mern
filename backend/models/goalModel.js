import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
   
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    accomplished: {
      type: Boolean,
      required: true,
      default:false
    }

  
  },
  { timestamps: true }
);

const InComeModel = mongoose.model("Goal", goalSchema);

export default InComeModel;
