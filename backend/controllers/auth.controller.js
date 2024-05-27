import User from "../model/userModel.js";

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

    /* profile picture */
    const mailProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    /* save user */
    const newUser = new User({
      fullName,
      userName,
      password,
      gender,
      email,
      profilePicture:
        gender === "male" ? mailProfilePicture : femaleProfilePicture,
    });

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      email: newUser.email,
      gender: newUser.gender,
      profilePicture: newUser.profilePicture,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    console.log("error in signup controller", error.message);

    res.status(500).json({ error: "internal server error" });
  }
};

/* user login */
export const loginUser_post = (req, res) => {
  res.send("login route");
};

/* user logout */
export const logoutUser_post = (req, res) => {
  res.send("logout route");
};
