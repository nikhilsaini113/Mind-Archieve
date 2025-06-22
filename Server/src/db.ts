import mongoose, { model, Schema } from "mongoose";
import "dotenv/config";
mongoose.connect(process.env.DB_LINK as string);

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const userModel = model("User", userSchema);

const contentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  type: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const contentModel = model("Content", contentSchema);

const linkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export const linkModel = model("Links", linkSchema);
