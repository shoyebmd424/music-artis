import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../utils/validator/auth";
import { loginService } from "../../../service/auth/authService";
import { setUser } from "../../../service/auth/authentication";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState({ password: false, cnfPassword: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (val) => {
    const data = await loginService(val);
    console.log(data?.user?.role);
    if (!data) return;
    if (data && data?.user?.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate('/user')
    }
    setUser(data);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-purple text-center">Login</h2>
      <div className="d-flex flex-column gap-sm-4 gap-3 ">
        {fields?.map((val, index) => (
          <div key={index} className="field">
            <label htmlFor="">{val?.label}</label>
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
        <Link
          to="/auth/forget"
          className="text-purple text-decoration-none text-end mb-auto"
        >
          Forget Password
        </Link>
        <div>
          <button className="btn-purple w-100">Submit</button>
        </div>
        <div className="text-center fw-600 d-sm-flex gap-2 justify-content-center">
          <span>Don't have Account,</span>
          <Link to="/auth/register" className="text-purple">
            Create Account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;

const fields = [
  { label: "Email", name: "email", isRequired: true },
  { label: "Password", name: "password", isRequired: true, type: "password" },
];
