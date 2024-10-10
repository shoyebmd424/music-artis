const {
  register,
  login,
  updateUserDetails,
  getAllUsers,
  getUserById,
  logout,
  sendOtp,
  verifyOTP,
  setPassword,
} = require("../../controller/authController");
const uploadMuiltiFieldFiles = require("../../middlewares/uploadMultifieldFiles");

const AuthRoutes = require("express").Router();
AuthRoutes.post("/register",uploadMuiltiFieldFiles("public/profile"), register);
AuthRoutes.post("/login", login);
AuthRoutes.put("/update/:id", updateUserDetails);
AuthRoutes.get("/", getAllUsers);
AuthRoutes.get("/users/:id", getUserById);
AuthRoutes.get("/logout", logout);
AuthRoutes.post("/forget", sendOtp);
AuthRoutes.post("/otp-verification", verifyOTP);
AuthRoutes.post("/reset-password", setPassword);
AuthRoutes.get("/test", (req, res) => {
  res.send("working fine");
});

module.exports = AuthRoutes;


