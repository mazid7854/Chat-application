import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import upload from "../middleware/upload.js";
export const getUserForSidebar_get = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // find all users excluding logged in user
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in get user for sidebar controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

//search user by keyword

export const searchUserByKeyword_get = async (req, res) => {
  try {
    const { keyword } = req.query;
    const loggedInUserId = req.user._id;
    const users = await User.find({
      $and: [
        { _id: { $ne: loggedInUserId } },
        {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
          ],
        },
      ],
    }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log("error in search user by keyword controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getLastSeenUser_get = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ lastSeen: user.lastSeen });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser_put = async (req, res) => {
  // Update user
  const { password } = req.body;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// upload profile picture

export const uploadProfilePicture_post = async (req, res) => {
  console.log("User ID:", req.params.id);
  console.log("File Received:", req.file);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Get user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save Cloudinary URL
    user.profilePicture = req.file.path; // Cloudinary provides this path
    await user.save();

    res.json({ profilePicture: user.profilePicture });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
