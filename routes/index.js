const AuthRoutes = require("./auth/authRoutes");

const Router=require("express").Router();
Router.use("/auth",AuthRoutes);


module.exports=Router;