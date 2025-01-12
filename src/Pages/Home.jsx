import React, { useEffect, useState } from "react";
import { useAuth } from "../Zustand/store";
import { InfiniteScroll, AccountInfo } from "../Components/index";
const Home = () => {
  const { user, reset } = useAuth();
  useEffect(() => {
    return reset();
  }, []);

  return (
    <div className=" h-screen flex space-x-4 sm:p-6 p-3">
      <InfiniteScroll />
      <AccountInfo />
    </div>
  );
};

export default Home;
