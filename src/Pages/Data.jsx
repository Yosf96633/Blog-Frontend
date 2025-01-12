import { Form, Input, Button, DatePicker, Upload, Avatar, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import axiosInstance from "../Lib/axios";
import { useNavigate, useParams } from 'react-router';

const Data = () => {
    const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL
  const [form] = Form.useForm();
  const [file, setFile] = useState(null); // Store selected file
  const [imageUrl, setImageUrl] = useState(null); // Preview image URL
  const [loading, setLoading] = useState(false);

  const handleImageChange = (info) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result); // Set preview image URL
    };
    if (info.file) {
      setFile(info.file); // Save file for upload
      reader.readAsDataURL(info.file);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { bio, dob } = values;
      const formData = new FormData();

      formData.append('profile_pic', file); // Attach profile picture
      formData.append('bio', bio); // Attach bio
      formData.append('DOB', dob.format('YYYY-MM-DD')); // Attach DOB formatted

      // Send data to the backend
      const response = await axiosInstance.post(`/auth/get-info/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        message.success(response.data.message);
        navigate('/login')
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center bg-[#232D3F] pt-6 text-white">
      <div className="p-6 shadow-lg" style={{ width: '400px' }}>
        <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            bio: '',
            dob: null, 
          }}
        >
          {/* Profile Image Upload */}
          <Form.Item
            label="Profile Picture"
            name="profile_pic"
            rules={[{ required: true, message: 'Please upload your profile picture!' }]}
          >
            <div className="flex flex-col items-center">
              <Upload
                accept="image/*"
                beforeUpload={() => false} // Prevent auto upload
                showUploadList={false}
                onChange={handleImageChange}
              >
                <Avatar
                  size={100}
                  icon={!imageUrl && <UserOutlined />}
                  src={imageUrl}
                  style={{ cursor: 'pointer' }}
                />
              </Upload>
              <Button
                type="default"
                icon={<UploadOutlined />}
                style={{ marginTop: '10px' }}
              >
                Choose Image
              </Button>
            </div>
          </Form.Item>

          {/* Bio */}
          <Form.Item
            label="Bio"
            name="bio"
            rules={[{ required: true, message: 'Please enter your bio!' }]}
          >
            <Input.TextArea rows={4} placeholder="Write about yourself..." />
          </Form.Item>

          {/* Date of Birth */}
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Data;
