import User from "../model/userModel.js";
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
