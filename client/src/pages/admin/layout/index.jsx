import React from 'react'
import Sidebar from '@/common/sidebar'
import Header from '@/common/header'
import { Outlet } from 'react-router-dom'
import { BsFillGridFill } from "react-icons/bs"

const AdminLayout = () => {
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
  )
}

export default AdminLayout;



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
