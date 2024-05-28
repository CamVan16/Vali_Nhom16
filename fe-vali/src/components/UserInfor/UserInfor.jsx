import React, { useState, useEffect } from 'react';
import { Button, Form, message } from 'antd';
import { WrapperContainer, StyleInput } from './style';
import { useSelector } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlide.js';
import { useDispatch } from 'react-redux';

const UserInfo = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    mobile: '',
    addresses: [{ address: '' }],
  });
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    fetchUserData();
  }, [userID]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/getById/${userID}`);
      const data = await response.json();
      setUserData({
        ...data,
        addresses: data.addresses.length > 0 ? data.addresses : [{ address: '' }], // Ensure addresses is never empty
      });
    } catch (error) {
      message.error('Đã xảy ra lỗi khi cập nhật thông tin người dùng');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address') {
      const newAddresses = [...userData.addresses];
      newAddresses[0] = { address: value };
      setUserData({
        ...userData,
        addresses: newAddresses,
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/update/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      dispatch(updateUser(data));
      //message.success('Thông tin người dùng đã được cập nhật thành công');
      fetchUserData();
    } catch (error) {
      message.error('Đã xảy ra lỗi khi cập nhật thông tin người dùng');
    }
  };

  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Thông tin người dùng</h1>
      <WrapperContainer>
        <Form onFinish={handleSubmit} name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} >
          <Form.Item label="Tên tài khoản" >
            <StyleInput name="username" value={userData.username} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Email" >
            <StyleInput name="email" value={userData.email} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Số điện thoại" >
            <StyleInput name="mobile" value={userData.mobile} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Địa chỉ">
            <StyleInput name="address" value={userData.addresses[0]?.address || ''} onChange={handleChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Chỉnh sửa thông tin
            </Button>
          </Form.Item>
        </Form>
      </WrapperContainer>
    </div>
  );
};

export default UserInfo;
