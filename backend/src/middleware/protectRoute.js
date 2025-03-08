import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in protect route", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export default protectRoute;
