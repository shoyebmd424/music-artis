import { useLocation, useNavigate } from "react-router-dom";
import { InputOtp } from "primereact/inputotp";
import { useEffect, useRef, useState } from "react";
import React from "react";
import "./otpVerification.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { showToast } from "../../../utils/toasters";
import { forgetService, otpVerificationService } from "../../../service/auth/authService";

const OtpVarification = ({ role }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const inputContainerRef = useRef(null);
  
  const [otp, setOtp] = useState("");
  const [isOtpResent, setIsOtpResent] = useState(false);
  console.log(state)

  useEffect(() => {
    if (!state?.email) {
      navigate(-1);
    }
  }, [navigate, state]);

  useEffect(() => {
    if (inputContainerRef.current) {
      const inputs = inputContainerRef.current.querySelectorAll(".p-inputotp-input");

      if (inputs instanceof NodeList && inputs.length > 0) {
        inputs.forEach((input) => {
          input.setAttribute("placeholder", "-");
        });
      } else {
        console.warn("No input elements found with the class '.p-inputotp-input'");
      }
    }
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (otp.trim().length === 6) {
   const data=await otpVerificationService({email:state?.email,otp});
   if(data){
    navigate("/auth/reset-password",{state:{email:state?.email}})
   }
    } else {
        console.log(otp.trim().length)
      showToast("error","Please enter a valid 6-digit OTP.");
    }
  };

  const handleResendOtp = async() => {
    setIsOtpResent(true);
  const data= await forgetService({email:state?.email});
  if(data){
    setIsOtpResent(false);
    setOtp(""); 
  }
  };

  return (
    <div className="otp-verification">
      <h3 className="text-purple text-center">OTP Verification</h3>
      <p className="text-center">A One-Time Password has been sent to your registered email address.</p>
      
      <form onSubmit={handleSubmit}>
        <div ref={inputContainerRef} className="otp-verification-form text-center">
          <InputOtp
            length={6}
            style={{justifyContent:"center"}}
            value={otp}
            onChange={(e) => setOtp(e?.value || "")}
            required
          />

          <div className="mb-3 me-auto my-3">
            <button
              type="button"
              onClick={handleResendOtp}
              className="bg-transparent border-0 text-decoration-underline text-purple fw-semibold"
              disabled={isOtpResent}
            >
              {isOtpResent ? "OTP Sending" : "Resend OTP"}
            </button>
          </div>

          <button type="submit" className="btn-purple py-2  w-100">
            Validate
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpVarification;
