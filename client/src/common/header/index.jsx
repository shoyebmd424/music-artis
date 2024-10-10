import React, { useEffect, useRef, useState } from "react";
import "./header.scss";
import {
  MdLogout,
  MdNotificationsNone,
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdPerson,
} from "react-icons/md";

import { useLocation, useNavigate } from "react-router-dom";

import { formatPathToTitle } from "@/utils/formater/StringFormater";
import { getUserByIdService, logoutService } from "@/service/auth/authService";
import { getUser } from "@/service/auth/authentication";
import { Server } from "../../service/axios";

const Header = () => {
  const [showDropdown, setShowDropDown] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const curPage = formatPathToTitle(pathname);
  const [profile, setProfile] = useState(null);
  const userId=getUser()?.user?.id;


  const handlelogout = async () => {
      const  data  = await logoutService();
      if(data){
      navigate(`/auth/login`);
      }
  };

  useEffect(() => {
    const handle = async () => {
        const  data = await getUserByIdService(userId);
        setProfile(data);
    }
    handle();
  }, [userId]);
  return (
    <div className="d-flex  admin-header justify-content-between align-items-center">
      <h5 className="text-capitalize">{curPage}</h5>
      <div className="right-profile  d-flex gap-4">
        <div className="d-flex  gap-2">
          <div className=" text-purple flex-column d-flex my-auto fw-600">
          <span className="fw20">  {profile?.email} </span>
            <small className="role fs12">{profile?.role}</small>
          </div>
          <button
            className="d-flex btn text-start"
            onClick={() => setShowDropDown(!showDropdown)}
          >
            <div className="d-flex flex-column">
              <div className="pro-img rounded-circle" style={{width:"50px"}}>
                <img src={Server+profile?.profile} className="w-100 h-100 rounded-circle" alt="profile" />
              </div>
              {/* <small className="role fs12">{profile?.role}</small> */}
            </div>
            {/* {!showDropdown ? (
              <MdOutlineArrowDropDown size={30} />
            ) : (
              <MdOutlineArrowDropUp size={30} />
            )} */}
          </button>
        </div>
        <ul
          className={`drop-down-list ${
            showDropdown && "dropdown-toggles"
          } px-0 rounded d-flex flex-column gap-1`}
        >
          {/* <li
            className="d-flex gap-2 text-purple"
            onClick={() => navigate("profile-settings")}
          >
            <MdPerson size={20} /> <span>Profile Settings</span>
          </li> */}
          <li className="d-flex gap-2 text-purple" onClick={() => handlelogout()}>
            <MdLogout size={20} /> <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
