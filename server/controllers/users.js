import User from "../models/User.js";

// Register user

export const register = async (req, res) => {
  let user;

  try {
    user = new User(req.body);
    await user.save();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Can't create user" });
  } else {
    res.status(201).json(user);
  }
};

// login

export const login = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    const user = await User.findOne({ email: email, type: type });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    if (user.password === password) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
  } catch (err) {
    console.log(err);
  }
};
