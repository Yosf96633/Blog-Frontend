import React, { useRef} from "react";
import { Avater } from "./index";
import { Input } from "antd";
import { useAuth } from "../Zustand/store";
import { useNavigate } from "react-router";
const Header = () => {
   const navigate = useNavigate();
  const {user} = useAuth();
  const ref = useRef();
  return (
    <header className="bg-[#232D3F] w-screen space-x-2 backdrop-blur-2xl flex justify-between
     text-white px-12 max-sm:px-2 py-3 border-b-[1px] border-white mb-2">
      <h1 onClick={()=>{
        navigate("/")
      }} className="flex cursor-pointer items-center text-xl">
        B<span className="text-xl">logify</span>
      </h1>
     {user &&  <div className=" flex justify-center items-center">
        {" "}
        <Input.Search
        ref={ref}
          onSearch={(value) => {
              if(value.trim()){
                  navigate(`/search?name=${value}`);
              }
          }}
          placeholder="Search people!"
        />
      </div>}
      <div className="md:hidden">
        <Avater />
      </div>
    </header>
  );
};
export default Header;
