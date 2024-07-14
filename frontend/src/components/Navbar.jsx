import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center px-4 md:px-20 bg-blue-100 h-16 sticky top-0">
        {/* LOGO */}
        <div className="select-none text-3xl font-semibold cursor-pointer">
          <NavLink to="/" end className={"text-blue-600"}>
            <span className="text-blue-800">LMS</span>
          </NavLink>
        </div>
        {/* NavLinks */}
        {/* For Big Screen */}
        <div
          className={`${
            toggleMenu
              ? "fixed top-5 right-0 bg-blue-100 flex flex-col w-1/2 px-5 h-screen"
              : "hidden"
          } md:flex md:flex-row gap-4 md:items-center md:px-0 md:relative md:w-auto md:top-0 md:h-auto`}
        >
          {navLinks.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.link}
                end={true}
                className={({ isActive }) =>
                  `uppercase font-medium cursor-pointer ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>

        {/* Toogle button */}
        <div
          className="md:hidden flex flex-col justify-center items-center"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <div
            className={`${
              toggleMenu ? "rotate-45 translate-y-[3.5px]" : ""
            } w-5 bg-black h-[3px] rounded-lg m-[2px] transition ease transform duration-300`}
          ></div>
          <div
            className={`${
              toggleMenu ? "hidden" : "block"
            } w-5 bg-black h-[3px] rounded-lg m-[2px] transition ease transform duration-300`}
          ></div>
          <div
            className={`${
              toggleMenu ? "-rotate-45 -translate-y-[3.5px]" : ""
            } w-5 bg-black h-[3px] rounded-lg m-[2px] transition ease transform duration-300`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
