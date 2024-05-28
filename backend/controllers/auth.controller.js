import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import generateTokenAndSetCookie from "../jwt/generateToken.js";

export const signupUser_post = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender, email } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords not match" });
    }

    /*  const user = await User.findOne({ userName });
    console.log(user);
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    } */

    /* hash password */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* profile picture */
    const mailProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    /* create new user */
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      email,
      profilePicture:
        gender === "male" ? mailProfilePicture : femaleProfilePicture,
    });

    if (newUser) {
      /* save user */

      // generate token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        email: newUser.email,
        gender: newUser.gender,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    console.log("error in signup controller", error.message);

    res.status(500).json({ error: "internal server error" });
  }
};

/* user login */
export const loginUser_post = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // generate token
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      gender: user.gender,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("error in login controller", error.message);

    res.status(500).json({ error: "internal server error" });
  }
};

/* user logout */
export const logoutUser_post = (req, res) => {
  try {
    res.clearCookie("JWT"); // clear cookie
    res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
