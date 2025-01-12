import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Modal, Avatar, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../../Zustand/store';
import axiosInstance from '../../Lib/axios';

const { Option } = Select;

const CreatePost = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [tags, setTags] = useState([]);

  // Open/Close Modal
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  // Handle Image Upload
  const handleImageChange = (info) => {
    const reader = new FileReader();
    reader.onload = (e) => setImageUrl(e.target.result);
    if (info.file) {
      setFile(info.file);
      reader.readAsDataURL(info.file);
    }
  };

  // Handle Tag Selection
  const handleTagChange = (value) => {
    setTags(value);
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', postTitle);
      formData.append('content', postText);
      formData.append('tags', JSON.stringify(tags)); // Convert tags array to string for backend

      // Send to backend
      const response = await axiosInstance.post('/create-blog', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        message.success('Post created successfully!');
        setIsModalOpen(false);
        resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Error creating post:', error.response.data);
      message.error('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };
  const resetFields = () => {
    setPostTitle('');
    setPostText('');
    setTags([]);
    setFile(null);
    setImageUrl(null);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #d9d9d9', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
      {/* Avatar */}
      <Avatar size="large" src={user.imageDetails.imageURL} />

      {/* Button to open modal */}
      <Button type="text" onClick={showModal} style={{ flexGrow: 1, textAlign: 'left', padding: '0 12px' }}>
        What's on your mind?
      </Button>

      {/* Modal */}
      <Modal
        title="Create Post"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit} loading={loading}>
            Post
          </Button>,
        ]}
      >
        {/* Title Input */}
        <Input
          placeholder="Enter title of the post"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          style={{ marginBottom: '10px' }}
        />

        {/* Content/Text Area */}
        <Input.TextArea
          placeholder="Write your thoughts..."
          rows={4}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          style={{ marginBottom: '10px' }}
        />

        {/* Tags Dropdown */}
        <Select
          mode="tags"
          style={{ width: '100%', marginBottom: '10px' }}
          placeholder="Select tags"
          value={tags}
          onChange={handleTagChange}
        >
          {/* Add your predefined tags here */}
          <Option value="technology">Technology</Option>
          <Option value="lifestyle">Lifestyle</Option>
          <Option value="health">Health</Option>
          <Option value="education">Education</Option>
          <Option value="business">Business</Option>
        </Select>

        {/* Image Upload */}
        <Upload
          listType="picture"
          beforeUpload={() => false}
          onChange={handleImageChange}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default CreatePost;
