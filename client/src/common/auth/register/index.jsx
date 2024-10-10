import { Link } from "react-router-dom";
import "./register.scss";
import {  useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../../../utils/validator/auth";
import FileUploadDrop from "../../../utils/dragDrop";
import { registerService } from "../../../service/auth/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
    const [file, setFile] = useState(null);
    const [fileErr,setFileError]=useState("");
    const [show, setShow] = useState({ password: false, cnfPassword: false });

    const { register, handleSubmit,  formState: { errors } } = useForm({
         mode: 'onBlur',
        resolver: yupResolver (authSchema),
      });

      const onSubmit = async(val) => {
        if(!file){
            setFileError('Profile picture is required')
            return;
        }
        val.profile=file;
        const formData=new FormData();
        for(const [key,value] of Object.entries(val)){
            formData.append(key,value);
        }
        const data= await registerService(formData);
      };
   

  return (
    <div className="register-form p30 rounded-3">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column gap-4">
       {fields?.map((val,index)=>( <div key={index} className="field">
          <label htmlFor=''>
           {val?.label}
            <span> {val?.isRequired&&<>(required)</>}</span>
          </label>
          {val?.name==='phone'?
          <>
            <div className="field bg-white px-2">
        <PhoneInput
        defaultCountry="US"
       {...register(val?.name)}
       />
        </div>
       {errors.phone && <small className="error-message">{errors.phone.message}</small>}
       </>
        :
        <>
        {val?.type==='file'?  <FileUploadDrop
                      file={file}
                      onFileSelect={setFile}
                      error={errors[val?.name]?.message}
                    />
                     :  <input name={val?.name}  type={
                      val?.type === "password"
                        ? show[val?.name]
                          ? "text"
                          : "password"
                        : val?.type || "text"
                    }   {...register(val?.name)}/>}
         {val?.type==='file'&& <small className="text-light-white fs16">A photo of you, with a distinguishable background are best. Blurry or pixelated photos will be rejected. Faceless logos are allowed, but portraits are preferred.</small>}
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
          {(errors[val?.name]||fileErr) && <small className="error-message">{errors[val?.name].message||fileErr}</small>}
          </>
          }
        </div>))}
        <div><button className="btn-purple w-100">Submit</button></div>
        <div className="text-center fw-600 d-flex gap-2 justify-content-center"> <span>Aready Account</span><Link to="/auth/login" className="text-purple">  Login</Link></div>

        </div>
      </form>
    </div>
  );
}

export default Register

const fields=[
    {label:'Artist Name',name:"name",isRequired:true},
    {label:'Spotify URL',name:"spotifyUrl",isRequired:true},
    {label:'Instagram URL',name:"instagramUrl",isRequired:true},
    {label:'Email',name:"email",isRequired:true},
    {label:'Password',name:"password",isRequired:true,type:'password'},
    {label:'Confirm Password',name:"cnfPassword",isRequired:true,type:'password'},
    {label:'Phone',name:"phone",isRequired:true},
    {label:'What are your goals for the next 5 years in music?',name:"goals",isRequired:false},
    {label:'Your Picture',name:"profile",isRequired:true,type:'file'},
    {label:'What services are you looking for?',name:"service",isRequired:true},
]