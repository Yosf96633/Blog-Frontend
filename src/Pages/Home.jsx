import React, { useEffect , useState } from "react";
import { useAuth } from "../Zustand/store";
import {InfiniteScroll , AccountInfo } from "../Components/index"
const Home = () => {
  const { user , reset } = useAuth();
  useEffect(()=>{
    return reset();
  } , [])

  return (
    <div className=" h-screen flex relative z-0">
         
         <InfiniteScroll/>
         <AccountInfo/>
          
    </div>
  );
};

export default Home;
