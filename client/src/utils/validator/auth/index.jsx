import * as yup from "yup";

export const authSchema = yup.object().shape({
    name: yup.string().required("Artist Name is required"),
    spotifyUrl: yup.string().url("Invalid Spotify URL").required("Spotify URL is required"),
    instagramUrl: yup.string().url("Invalid Instagram URL").required("Instagram URL is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    cnfPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    phone: yup.string().required("Phone number is required"),
    goals: yup.string(),
    // profile: yup.mixed().required("Profile picture is required"),
    service: yup.string().required("Service is required"),
  });

  export const loginSchema=yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  export const forgetSchema=yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  export const resetSchema=yup.object().shape({
    newPassword: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    cnfPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });