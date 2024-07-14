import React from "react";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="px-4 md:px-20">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
