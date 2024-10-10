import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/common/header'
import Sidebar from '@/common/sidebar'
import { BsFillGridFill } from "react-icons/bs"

const UserLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar sidebarData={sidebarData} />
      <div className="w-100">
        <div>
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout



const sidebarData = [
  {
    icon: <BsFillGridFill />,
    name: "Dashboard",
    path: "dashboard",
  },
  {
    icon: <BsFillGridFill />,
    name: "Dashboard2",
    path: "dashboard2",
  },
  
];
