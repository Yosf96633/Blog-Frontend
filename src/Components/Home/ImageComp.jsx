import React, { useState } from 'react';
import { Modal, Button } from 'antd';


const ImageComp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Button to trigger modal */}
      <Button type="primary" onClick={showModal}>
        Show High-Resolution Image
      </Button>

      {/* Full-screen modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null} // Hide footer
        width="100vw"
        style={{
          top: 0,
          padding: 0,
        }}
        bodyStyle={{
          height: '100vh',
          margin: 0,
          padding: 0,
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* High-resolution image */}
        <img
          src="https://example.com/high-res-image.jpg" // Replace with your image URL
          alt="High Resolution"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </Modal>
    </div>
  );
};

export default ImageComp;
