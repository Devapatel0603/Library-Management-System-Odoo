import React from "react";
import { GuestHome, UserHome } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  return <>{user ? <UserHome /> : <GuestHome />}</>;
};

export default Home;
