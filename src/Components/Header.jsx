import React, { useState } from "react";
import { SiBloglovin } from "react-icons/si";
import { Avater } from "./index"; // Assuming your Avatar component is being imported from here
const Header = () => {

  return (
    <header className="bg-[#232D3F] fixed w-screen z-50 backdrop-blur-2xl flex justify-center max-md:justify-between text-white px-6 py-3 border-b-[1px] border-white mb-2">
      <h1 className="flex items-center text-2xl">
        <SiBloglovin />
        <span className="text-xl font-semibold">logify</span>
      </h1>
      <div className="md:hidden">
        <Avater />
      </div>
    </header>
  );
};

export default Header;
