import { lazy } from "react";

/* eslint-disable react-refresh/only-export-components */
const AdminLayout =lazy(()=>import( "@/pages/admin/layout"));
const AdminHome =lazy(()=>import( "@/pages/admin/home")); 
const UserLayout =lazy(()=>import( "@/pages/user/layout"));
const UserHome =lazy(()=>import( "@/pages/user/home"));
const AuthLayout= lazy(()=>import( "@/common/auth/layout"));
const Register= lazy(()=>import( "@/common/auth/register"));
const Login= lazy(()=>import( "@/common/auth/login"));
const SetPassword= lazy(()=>import( "@/common/auth/setPassword"));
const Forget= lazy(()=>import( "@/common/auth/forget"));
const OtpVarification= lazy(()=>import( "@/common/auth/otpVarification"));

export const routes = [
  { path: "/auth",
    element: <AuthLayout />,
    needsAuth: false,
    children:[
      {
        path: "register",
    element: <Register />,
    needsAuth: false,
      },
      {
        path: "login",
    element: <Login />,
    needsAuth: false,
      },
      {
        path: "forget",
    element: <Forget />,
    needsAuth: false,
      },
      {
        path: "forget/otp-verification",
    element: <OtpVarification />,
    needsAuth: false,
      },
      {
        path: "reset-password",
    element: <SetPassword />,
    needsAuth: false,
      }
    
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    needsAuth: true,
    children:[
      {
        path: "",
        element: <AdminHome />,
        needsAuth: true,
      }
    ]
  },
  {
    path: "/user",
    element: <UserLayout />,
    needsAuth: true,
    children:[
      {
        path: "",
        element: <UserHome />,
        needsAuth: true,
      }
    ]
  }
];
