import React, { useEffect , useState } from "react";
import { useAuth } from "../Zustand/store";
import {InfiniteScroll , AccountInfo , ImageComp} from "../Components/index"
const Home = () => {
  const [toggle , setToggle] = useState(false)
  const { user , reset } = useAuth();
  useEffect(()=>{
    return reset();
  } , [])

  return (
    <div className=" h-screen flex relative z-0">
         <InfiniteScroll/>
         <AccountInfo setToggle={setToggle}/>
         
             { toggle && <ImageComp setToggle={setToggle}/>}
          
    </div>
  );
};

export default Home;
