import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../features/userSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_FRONTEND_URL}/user/logout`,
                { withCredentials: true }
            );
            if (res.status === 200) {
                dispatch(addUser());
            }
        } catch (error) {}
    };

    const navLinks = [
        {
            name: "Home",
            link: "/",
        },
    ];
    return (
        <>
            <div className="bg-white flex justify-between items-center px-4 md:px-20 border-b h-16 sticky top-0">
                {/* LOGO */}
                <div className="select-none text-3xl font-semibold cursor-pointer">
                    <NavLink to="/" end className={"flex items-center gap-2"}>
                        <img
                            src="logoImg.png"
                            alt="Logo Img"
                            className="w-10"
                        />
                        <img src="logo.png" alt="Logo" className="w-24" />
                    </NavLink>
                </div>
                {/* NavLinks */}
                {/* For Big Screen */}
                <div
                    className={`${
                        toggleMenu
                            ? "fixed top-0 right-0 bg-blue-100 flex flex-col w-1/2 px-5 h-screen py-5"
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
                                onClick={() => setToggleMenu(false)}
                            >
                                {item.name}
                            </NavLink>
                        </div>
                    ))}

                    {/* Login logout button */}
                    <div>
                        {user ? (
                            <>
                                <NavLink to="/" onClick={handleLogout}>
                                    <Button
                                        buttonText={"Logout"}
                                        classes="text-red-600 border-red-600 hover:text-red-700 hover:bg-red-100"
                                    />
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    onClick={() => setToggleMenu(false)}
                                >
                                    <Button buttonText={"Login"} />
                                </NavLink>
                            </>
                        )}
                    </div>
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
