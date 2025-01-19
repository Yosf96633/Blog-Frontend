import React, { useState } from "react";
import { useAuth } from "../Zustand/store";
import { Avatar, Modal, Button } from "antd";
import { MdPerson } from "react-icons/md"; 
import { RiLogoutCircleLine } from "react-icons/ri"; 
import { MdDelete } from "react-icons/md"; 
import { useNavigate } from "react-router";

const AvatarComponent = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
 


  return (
    <>
      {user && (
        <div className="flex justify-center items-center space-x-1 cursor-pointer">
          {/* Avatar */}
          <Avatar
            size={40}
            src={user?.imageDetails?.imageURL}
            onClick={() => navigate(`/profile/${user.id}`)}
          />
          <p className="text-base">{user?.name}</p>
        </div>
      )}
    </>
  );
};

export default AvatarComponent;
