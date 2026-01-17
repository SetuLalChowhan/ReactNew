import { useUserProfile } from "@/hooks/fetchUserProfile";
import { setToken } from "@/redux/slices/authSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  return <div>Home</div>;
};

export default Home;
