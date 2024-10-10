const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../middlewares/sendEmail");
const { message } = require("../helper/emailMessage");
const { OtpGenerator } = require("../helper/otpGenrator");
const bcrypt = require("bcryptjs");

// Register a new user
const register = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    const { password, cnfPassword } = req.body;
    if (user) {
      return res
        .status(409)
        .json({ message: "This username already exists, please login" });
    }
    if (password !== cnfPassword) {
      return res.status(401).json({ message: "Passwords do not match" });
    }
    if (req.files&&req.files?.profile) {
      req.body.profile = "/profile/pic/" + req?.files?.profile[0].originalname;
    }
    await User.create(req.body);
    res.status(201).json("Your account has been successfully created");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Your account does not exist, please sign up" });
    }
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      return res.status(403).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, "yourSecretKey", { expiresIn: "3h" });
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Logout user
const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update user details
const updateUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.files&&req.files?.profile) {
      req.body.profile = "/profile/pic/" + req?.files?.profile[0].originalname;
    }
    const updatedData = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Send OTP
const sendOtp = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(404).json({ message: "User not found, please create a new account" });
      return;
    }

    const otp = OtpGenerator();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expirationTime = Date.now() + 2 * 60 * 1000;

    await sendEmail(
      message(otp),
      req.body.email,
      "One Time Password from Music Service"
    );

    user.forget = {
      otp: hashedOtp,
      otpExpiration: expirationTime,
      otpVerify: false,
    };

    await user.save();
    res.status(200).json("OTP has been sent to your email ID");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(404).json({ message: "Wrong OTP, please enter the correct OTP" });
      return;
    }

    const { otpExpiration, otp } = user.forget;

    if (Date.now() > otpExpiration) {
      res.status(400).json({ message: "OTP has expired" });
      return;
    }

    const isOtpValid = await bcrypt.compare(req.body.otp.toString(), otp);
    if (!isOtpValid) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }

    const updatedForget = { ...user.forget, otpVerify: true };
    user.forget = updatedForget;
    await user.save();
    res.status(200).json("OTP verified successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Set new password
const setPassword = async (req, res) => {
  try {
    const { newPassword, cnfPassword } = req.body;
    if (newPassword !== cnfPassword) {
      res.status(403).json({ message: "Passwords do not match" });
      return;
    }
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user || !user.forget.otp) {
      res.status(404).json({ message: "OTP expired, please resend OTP" });
      return;
    }

    if (user.forget.otp) {
      user.password = await bcrypt.hash(newPassword, 10);
    }


    user.forget = {
      otp: "",
      otpExpiration: new Date(),
      otpVerify: false,
    };
    user.password=newPassword;
    await user.save();
    res.status(200).json("Password reset successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserDetails,
  logout,
  sendOtp,
  verifyOTP,
  setPassword,
};
