import React, { useEffect, useState } from "react";
import { useAuth } from "../../Zustand/store";
import { Button, message, Modal } from "antd";
import { MdDelete, MdPerson } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiBaby } from "react-icons/pi";
import { motion } from "framer-motion";
import axiosInstance from "../../Lib/axios";
const AccountInfo = () => {
  const { user, logout, loading, reset, deleteAccount } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numbers, setNumbers] = useState({ followers: 0, followings: 0 });
  const dateObj = new Date(user?.DOB);
  const date = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const fetchNumbers = async () => {
    try {
      const response = await axiosInstance.get(`/check-numbers`);
      if (response.data.success) {
        setNumbers({
          followers: response.data.numbers.followers,
          followings: response.data.numbers.followings,
        });
        return;
      }
    } catch (error) {
      console.log(error.response.data);
      
    }
  };
  useEffect(() => {
    fetchNumbers();
  } , []);
  useEffect(() => {
    return reset();
  }, []);

  return (
    <div className="w-1/4 bg-[#414d63] rounded-2xl flex flex-col justify-center items-center max-md:hidden space-y-6 px-4 ">
      <h1 className="text-2xl text-center font-semibold">Account info</h1>
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <div className=" size-32 cursor-pointer object-cover rounded-full overflow-hidden">
        <motion.img
          onClick={() => setIsModalOpen(true)} // Open the modal on click
          whileHover={{ scale: 1.075 }}
          transition={{
            duration: 0.5,
            ease: "backInOut",
          }}
          className="size-32 cursor-pointer object-cover rounded-full"
          src={user.imageDetails.imageURL}
          alt="img"
        />
        </div>
        <p className="text-xl font-semibold">{user.name}</p>
      </div>
      <div className="flex justify-evenly space-x-3">
        <p>Followers: {numbers.followers}</p>
        <span className="border-[1px] border-white"></span>
        <p>Followings: {numbers.followings}</p>
      </div>
      <div className=" flex items-center space-x-2">
        <MdPerson className="text-2xl" />
        <p>{user.bio}</p>
      </div>
      <div className=" flex items-center space-x-2">
        <PiBaby className="text-2xl" />
        <p>{date}</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        <Button
          loading={loading}
          onClick={async () => {
            await logout();
          }}
          icon={<RiLogoutCircleLine />}
        >
          Log out
        </Button>
        <Button
          onClick={async () => {
            await deleteAccount();
          }}
          icon={<MdDelete />}
        >
          Delete account
        </Button>
      </div>

      {/* Full-Screen Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)} // Close modal on cancel
        footer={null} // Remove footer
        width="100vw"
        style={{ top: 0, padding: 0 }}
        styles={{
          height: "100vh",
          margin: 0,
          padding: 0,
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={user.imageDetails.imageURL}
          alt="High-Resolution"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </Modal>
    </div>
  );
};

export default AccountInfo;
