import React from "react";
import SearchBook from "./SearchBook";
import UserBook from "./UserBook";
import { useSelector } from "react-redux";

const UserHome = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
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
            <UserBook info={{ value: "15", color: "green" }} />
          </div>
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-medium border-b-2 border-black">
            User Profile
          </h2>
          <div className="flex flex-col gap-2 mt-10">
            <img src={user.profile_photo} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
