import { Link, useNavigate } from "react-router-dom";
import { forgetSchema } from "../../../utils/validator/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { forgetService } from "../../../service/auth/authService";
import { useState } from "react";

const Forget = () => {
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const { register, handleSubmit,  formState: { errors } } = useForm({
        mode: 'onBlur',
       resolver: yupResolver (forgetSchema),
     });
     const onSubmit =async (val) => {
        setLoading(true)
       const data=await forgetService(val);
       if(data){
        navigate("otp-verification", { state: { email: val?.email } });
       }
       setLoading(false);
     };
  

    

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
         <h2 className="text-purple text-center">Forget Password</h2>
         <p className="text-center">A One-Time Password (OTP) has been sent to your <br /> registered email/phone. Please enter the code to verify your identity.  It expires in 2 minutes. Resend if needed.</p>
      <div className="d-flex flex-column gap-4">
          <div className="field">
            <label htmlFor="">
              Enter Email / Username
            </label>
            <input
              name='email'
              type='email'
              {...register('email')}
            />
        
            {errors?.email && (
              <small className="error-message">
                {errors?.email?.message}
              </small>
            )}
          </div>
        <div>
          <button className="btn-purple w-100">{loading?"Sending...":'Send OTP'}</button>
        </div>
        <div className="text-center fw-600 d-flex gap-2 justify-content-center">
          <span>Back To </span>
          <Link to="/auth/login" className="text-purple">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Forget
