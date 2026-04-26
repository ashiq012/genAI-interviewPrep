const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all field are required!",
      });
    }
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist)
      return res.status(401).json({
        success: false,
        message: "user already exist",
      });

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "user registered successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "failed to register",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user exist or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user doesn't exist. Register!",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "password not valid",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "failed to login",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "").json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  return res.status(200).json({
    success: true,
    message: "Fetched logged in user details",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
module.exports = {
  registerUser,
  login,
  logout,
  getMe,
};
