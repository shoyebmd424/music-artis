import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import logo from "../../assets/images/auth/Copy of Untitled Design (320 x 132 px) (1).png";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { getUser } from "../../service/auth/authentication";
import { getUserByIdService } from "../../service/auth/authService";

const Sidebar= ({ sidebarData }) => {
  const [isClose, setIsClose] = useState(false);
  const userId=getUser()?.user?.id;
  const [user,setUser]=useState(null);

  useEffect(() => {
    const handle = async () => {
        const  data = await getUserByIdService(userId);
        setUser(data);
    }
    handle();
  }, [userId]);

  return (
    <div className={`sidebar-upper ${isClose ? "side-open" : ""}`}>
      <div className="sidebar">
        <div className=" py-4 position-relative text-purple d-flex align-items-center justify-content-between">
          {!isClose && (<>
            <div style={{width:"50px"}}>
              <img className="w-100 h-100" src={logo} alt="" />
            </div>
            <div className="text-purple me-auto ps-2 fw-bold text-capitalize text-center">
        {user?.name?.length<10?user?.name:user?.name+"..."}
        </div>
            </>
          )}
          <MdMenu
            onClick={() => setIsClose(!isClose)}
            className={isClose?"side-closer more":"side-closer"}
            size={30}
          />
        </div>
        <ul className="sidebar-list px-0">
          {sidebarData?.map((val, index) => (
            <NavLink key={index}
              to={val.path}
              className={({ isActive }) =>
                (isActive ? "active" : "") + " text-decoration-none"
              }
            >
              <li >
                <span>{val?.icon}</span>
                {!isClose && (
                  <>
                    <span>{val?.name}</span>
                    <span className={`ms-auto  active-icon`}>
                      <FaAngleRight />
                    </span>
                  </>
                )}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
