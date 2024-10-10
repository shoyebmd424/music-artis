import Axios from "../axios";

export const registerRepo=async(data)=>await Axios.post("/auth/register",data);
export const loginRepo=async(data)=>await Axios.post("/auth/login",data);
export const forgetRepo=async(data)=>await Axios.post("/auth/forget",data);
export const otpVerificationRepo=async(data)=>await Axios.post("/auth/otp-verification",data);
export const resetPasswordRepo=async(data)=>await Axios.post("/auth/reset-password",data);
export const updateRepo=async(data,id)=>await Axios.put(`/auth/${id}`,data);
export const getAllUsersRepo=async()=>await Axios.get("/auth/",data);
export const getUserByIdRepo=async(id)=>await Axios.get(`/auth/users/${id}`);
