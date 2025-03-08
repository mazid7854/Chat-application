import mongoose from "mongoose";

const profilePictureSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profilePicture: {
      url: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProfilePicture = mongoose.model(
  "ProfilePicture",
  profilePictureSchema
);
