import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { contentModel, linkModel, userModel } from "./db";
import "dotenv/config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.post("/api/v1/signup", async (req, res) => {
  //Left - zod validation, hash the password
  const username = req.body.username;
  const password = req.body.password;
  try {
    await userModel.create({
      username: username,
      password: password,
    });
    res.json({
      message: "User Signed Up",
    });
  } catch (e) {
    res.status(411).json({
      message: "User Already Exists",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await userModel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_PASSWORD as string
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrrect credentials",
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  await contentModel.create({
    link: link,
    type: type,
    title: req.body.title,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });
  res.json({
    message: "Content added",
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await contentModel
    .find({
      userId: userId,
    })
    .populate("userId", "username");
  res.json({
    content,
  });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await contentModel.deleteMany({
    contentId,
    //@ts-ignore
    userId: req.userId,
  });

  res.json({
    message: "Content Deleted",
  });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  //@ts-ignore
  const userId = req.userId;
  if (share) {
    const existingLink = await linkModel.findOne({
      userId: userId,
    });
    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    const hash = random(10);
    await linkModel.create({
      userId: userId,
      hash: hash,
    });

    res.json({
      hash,
    });
  } else {
    await linkModel.deleteOne({
      userId: userId,
    });

    res.json({
      message: "Removed link",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await linkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "Sorry incorrect input",
    });
    return;
  }
  // userId
  const content = await contentModel.find({
    userId: link.userId,
  });

  const user = await userModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(411).json({
      message: "user not found",
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});

app.listen(process.env.PORT);
