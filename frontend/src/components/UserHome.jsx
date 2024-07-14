import React from "react";
import SearchBook from "./SearchBook";
import UserBook from "./UserBook";
import { useSelector } from "react-redux";

const UserHome = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="sm:col-span-2">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-medium border-b-2 border-black">
                            Search Books
                        </h2>
                        <SearchBook />
                    </div>
                    <div className="flex flex-col gap-2 mt-10">
                        <h2 className="text-xl font-medium border-b-2 border-black">
                            My Books
                        </h2>
                        <UserBook
                            info={{
                                value: "Available Quantities: 15",
                                color: "green",
                            }}
                        />
                    </div>
                </div>
                <div className="col-span-1">
                    <h2 className="text-xl font-medium border-b-2 border-black">
                        User Profile
                    </h2>
                    <div className="p-2.5">
                        <div className="flex gap-2 mt-4 items-center">
                            <img
                                src={user.profile_photo}
                                alt="rpofile image"
                                className="w-12 h-12 border rounded-md"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {user.name}
                                </h2>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <span>
                                <img
                                    src="location.svg"
                                    alt="Location"
                                    className="w-6 h-6"
                                />
                            </span>
                            <div>
                                <p>{user.line1}</p>
                                <p>
                                    {user.city} {user.state} {user.pincode}
                                </p>
                                <p>{user.country}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <span>
                                <img
                                    src="call.svg"
                                    alt="Location"
                                    className="w-6 h-6"
                                />
                            </span>
                            <p>{user.phone}</p>
                        </div>
                        <div className="flex gap-2">
                            <span>
                                <img
                                    src="mail.svg"
                                    alt="Location"
                                    className="w-6 h-6"
                                />
                            </span>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <h2 className="text-xl font-medium border-b-2 mt-4">
                        Your Contact
                    </h2>
                    <div className="p-2.5">
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        {/* mail */}
                        <div className="flex gap-2">
                            <span>
                                <img
                                    src="mail.svg"
                                    alt="Location"
                                    className="w-6 h-6"
                                />
                            </span>
                            <p>{user.email}</p>
                        </div>
                        {/* phone */}
                        <div className="flex gap-2">
                            <span>
                                <img
                                    src="call.svg"
                                    alt="Location"
                                    className="w-6 h-6"
                                />
                            </span>
                            <p>{user.phone}</p>
                        </div>
                        {/* Location */}
                        <div className="flex gap-2">
                            <span>
                                <img
                                    src="location.svg"
                                    alt="Location"
                                    className="w-6 h-6"
                                />
                            </span>
                            <p>{user.city}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHome;
