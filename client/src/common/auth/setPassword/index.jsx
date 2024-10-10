import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  resetSchema } from "../../../utils/validator/auth";
import { resetPasswordService } from "../../../service/auth/authService";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const SetPassword = () => {
    const navigate=useNavigate();
    const {state}=useLocation();
    const [show, setShow] = useState({ newPassword: false, cnfPassword: false });
    useEffect(()=>{
        if(!state||!state?.email){
            navigate(-1);
        }
    },[navigate,state]);
    const { register, handleSubmit,  formState: { errors }} = useForm({
         mode: 'onBlur',
        resolver: yupResolver (resetSchema),
      });
      const onSubmit = async(val) => {
        val.email=state?.email
       const data=await resetPasswordService(val);
       if(data){
        navigate("/auth/login");
        return;
       }
      };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
         <h2 className="text-purple text-center">Reset Password</h2>
      <div className="d-flex flex-column gap-4">
        {fields?.map((val, index) => (
          <div key={index} className="field">
            <label htmlFor="">
              {val?.label}
            </label>
            <input
              name={val?.name}
              type={
                val?.type === "password"
                  ? show[val?.name]
                    ? "text"
                    : "password"
                  : val?.type || "text"
              }
              {...register(val?.name)}
            />
            {val?.type === "password" && (
              <>
                {show[val?.name] ? (
                  <FaEye
                    onClick={() =>
                      setShow((prevShow) => ({
                        ...prevShow,
                        [val?.name]: false,
                      }))
                    }
                    size={20}
                    className={`password-tg ${
                      errors[val?.name]?.message && "pass-err"
                    }`}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() =>
                      setShow((prevShow) => ({
                        ...prevShow,
                        [val?.name]: true,
                      }))
                    }
                    size={20}
                    className={`password-tg ${
                      errors[val?.name]?.message && "pass-err"
                    }`}
                  />
                )}
              </>
            )}
            {errors[val?.name] && (
              <small className="error-message">
                {errors[val?.name].message}
              </small>
            )}
          </div>
        ))}
        <div>
          <button className="btn-purple w-100">Submit</button>
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

export default SetPassword

const fields=[
    {label:'New Password',name:"newPassword",isRequired:true,type:'password'},
    {label:'Confirm Password',name:"cnfPassword",isRequired:true,type:'password'},
]