import React, { useState } from "react";
import { useAuth } from "../Zustand/store";
import { Avatar, Modal, Button } from "antd"; // Import Ant Design Modal and Button
import { MdPerson } from "react-icons/md"; // Optional icons for styling
import { RiLogoutCircleLine } from "react-icons/ri"; // Logout icon
import { MdDelete } from "react-icons/md"; // Delete icon

const AvatarComponent = () => {
  const { user, logout, deleteAccount , loading} = useAuth(); // Get user data and actions from store
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state

  const handleLogout = async () => {
    await logout(); // Call the logout function from your store
    setIsModalOpen(false); // Close the modal after logging out
  };

  const handleDeleteAccount = async () => {
    await deleteAccount(); // Call the deleteAccount function from your store
    setIsModalOpen(false); // Close the modal after account deletion
  };

  return (
    <>
      {user && (
        <div className="flex justify-center items-center space-x-1 cursor-pointer">
          {/* Avatar */}
          <Avatar size={40} src={user?.imageDetails?.imageURL} onClick={() => setIsModalOpen(true)} />
          <p className="text-base">{user?.name}</p>
        </div>
      )}

      {/* Modal to display user details */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)} // Close modal on cancel
        footer={null} // Remove footer
        width="60vw" // Set width to 60% of the viewport width
        style={{
          top: "10%", // Adjust the vertical position
          padding: "20px",
        }}
        styles={{
          maxHeight: "80vh", // Set a max height for the modal content
          overflowY: "auto", // Enable scrolling if content overflows
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
            <strong>Date of Birth:</strong> {new Date(user?.DOB).toLocaleDateString("en-US")}
          </div>
          
          {/* Logout and Delete Account Buttons */}
 <div className="flex flex-col space-y-4 mt-6">
            <Button
              type="primary"
              icon={<RiLogoutCircleLine />}
              onClick={async () => {
                await logout();
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
