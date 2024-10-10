import { forgetRepo, getAllUsersRepo, getUserByIdRepo, loginRepo, otpVerificationRepo, registerRepo, resetPasswordRepo, updateRepo } from ".";
import { showToast } from "../../utils/toasters";
import { userLogout } from "./authentication";

export const registerService=async(val)=>{
try {
    const {data}=await registerRepo(val);
    if(data?.message){
        showToast('error',data?.message);
        return;
    }
    showToast('success',data);
    return data;
} catch (error) {
   console.log(error);
   showToast("error",error?.response?.data?.message); 
   return;
}
}

export const loginService=async(val)=>{
try {
    const {data}=await loginRepo(val);
    if(data?.message){
        showToast('error',data?.message);
        return;
    }
    showToast('success',data);
    return data;
} catch (error) {
   console.log(error);
   showToast("error",error?.response?.data?.message); 
   return;
}
}
export const logoutService=async()=>{
    try {
        const data=await userLogout();
      return data;
    } catch (error) {
        console.log(error)
        showToast("error",error?.response?.data?.message);
        return;
    }
}

export const forgetService=async(val)=>{
try {
    const {data}=await forgetRepo(val);
    if(data?.message){
        showToast('error',data?.message);
        return;
    }
    showToast('success',data);
    return data;
} catch (error) {
   console.log(error);
   showToast("error",error?.response?.data?.message); 
   return;
}
}

export const otpVerificationService=async(val)=>{
try {
    const {data}=await otpVerificationRepo(val);
    if(data?.message){
        showToast('error',data?.message);
        return;
    }
    showToast('success',data);
    return data;
} catch (error) {
   console.log(error);
   showToast("error",error?.response?.data?.message); 
   return;
}
}

export const resetPasswordService=async(val)=>{
try {
    const {data}=await resetPasswordRepo(val);
    if(data?.message){
        showToast('error',data?.message);
        return;
    }
    showToast('success',data);
    return data;
} catch (error) {
   console.log(error);
   showToast("error",error?.response?.data?.message); 
   return;
}
}

export const updateUserService=async(val,id)=>{
try {
    const {data}=await updateRepo(val,id);
    if(data?.message){
        showToast('error',data?.message);
        return;
    }
    showToast('success',data);
    return data;
} catch (error) {
   console.log(error);
   showToast("error",error?.response?.data?.message); 
   return;
}
}

export const getUserByIdService=async(id)=>{
try {
    const {data}=await getUserByIdRepo(id);
    if(data?.message){
        showToast('error',data?.message);
        return;
    }
    showToast('success',data);
    return data;
} catch (error) {
   console.log(error);
//    showToast("error",error?.response?.data?.message); 
   return;
}
}

export const getAllUserService=async()=>{
try {
    const {data}=await getAllUsersRepo();
    if(data?.message){
        showToast('error',data?.message);
        return;
    }
    showToast('success',data);
    return data;
} catch (error) {
   console.log(error);
   showToast("error",error?.response?.data?.message); 
   return;
}
}