import mongoose from "mongoose";

const userLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String,
    role: String,
    ip: String,
    loginAt: Date,
    logoutTime: Date,
    tokenName: String,
  },
  { timestamps: true }
);

export default mongoose.model("UserLog", userLogSchema);
