import React from "react";
import "./layout.scss";
import logo from "@/assets/images/auth/Copy of Untitled Design (320 x 132 px) (1).png";
import cardImage from "@/assets/images/auth/Copy of ARTIST CARD TEMPLATE (2).gif";
import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
    const location=useLocation();
    const lastUrl=location.pathname.split("/")[location.pathname.split("/").length-1];
  return (
    <div className="auth">
      <div className="head-tag">
        <div className="logo-tag">
          <img src={logo} alt="" className="w-100 h-100" />
        </div>
        {lastUrl==='register'&&<>
        <div className="d-flex flex-column gap-3">
          <h2 className="text-center fw-700 fs34 text-purple">Apply for your Artist Card.</h2>
          <p className="text-center fs18 mb-0">
            Complete the form below, and we'll get back to you if we think <br />
            there's potential to grow with us.
          </p>
        </div>
        </>}
      </div>
      {lastUrl==='register'&&<>
        <div className="auth-welcome-card ">
          <div className="col-10 col-lg-4 col-md-5 col-sm-7 mx-auto">
            <img src={cardImage} alt="" className="w-100 h-100" />
          </div>
        </div></>}
        <div className="auth-com col-lg-5 col-md-6 col-sm-9 col-11">
            <div  className="auth-form p30  rounded-3">
        <Outlet/>
            </div>
        </div>
    </div>
  );
};

export default AuthLayout;
