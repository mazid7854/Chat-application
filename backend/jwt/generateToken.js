import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokenAndSetCookie = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("JWT", token, {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true, // accessible only by web server
    sameSite: "strict", //cross-site cookie
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
};

export default generateTokenAndSetCookie;
