import React, { useState } from "react";
import { useAuth } from "../Zustand/store";
import { Avatar, Modal, Button } from "antd";
import { MdPerson } from "react-icons/md"; 
import { RiLogoutCircleLine } from "react-icons/ri"; 
import { MdDelete } from "react-icons/md"; 

const AvatarComponent = () => {
  const { user, logout, deleteAccount, loading } = useAuth(); 
  const [isModalOpen, setIsModalOpen] = useState(false); 


  return (
    <>
      {user && (
        <div className="flex justify-center items-center space-x-1 cursor-pointer">
          {/* Avatar */}
          <Avatar
            size={40}
            src={user?.imageDetails?.imageURL}
            onClick={() => setIsModalOpen(true)}
          />
          <p className="text-base">{user?.name}</p>
        </div>
      )}

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null} 
        width="85vw" 
        style={{
          top: "10%",
          padding: "20px",
        }}
        styles={{
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Image */}
          <Avatar size={80} src={user?.imageDetails?.imageURL} />
          <h2 className="text-2xl font-semibold">{user?.name}</h2>

          {/* User Bio */}
          <div className="flex items-center space-x-2">
            <MdPerson className="text-xl" />
            <p className="text-lg">{user?.bio}</p>
          </div>

          {/* Additional user details like followers, following, and DOB */}
          <div className="flex space-x-4">
            <div>
              <strong>Followers:</strong> {user?.followersCount}
            </div>
            <div>
              <strong>Following:</strong> {user?.followingCount}
            </div>
          </div>

          <div>
            <strong>Date of Birth:</strong>{" "}
            {new Date(user?.DOB).toLocaleDateString("en-US")}
          </div>

          {/* Logout and Delete Account Buttons */}
          <div className="flex flex-col space-y-4 mt-6">
            <Button
              type="primary"
              icon={<RiLogoutCircleLine />}
              onClick={async () => {
                await logout();
                setIsModalOpen(false);
              }}
              danger
            >
              Log Out
            </Button>
            <Button
              type="default"
              icon={<MdDelete />}
              loading={loading}
              onClick={async () => {
                await deleteAccount();
                setIsModalOpen(false);
              }}
              danger
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AvatarComponent;
