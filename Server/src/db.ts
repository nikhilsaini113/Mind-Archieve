import mongoose, { model, Schema } from "mongoose";

mongoose.connect(
  "mongodb+srv://admin:mongodb@cluster0.cbpz7zm.mongodb.net/mindArchive"
);

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
