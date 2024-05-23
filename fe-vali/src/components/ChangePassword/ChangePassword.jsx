import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import { WrapperContainer, StyleInputPassword } from './style';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const userID = localStorage.getItem('userID');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmNewPassword') setConfirmNewPassword(value);
  };

  const handleLogout = async () => {
    try {
      
      window.location.href = '/SignIn';
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      message.error('Mật khẩu mới và nhập lại mật khẩu mới không khớp.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/getById/${userID}`);
      const userData = await response.json();

      if (userData.password !== oldPassword) {
        message.error('Mật khẩu cũ không đúng.');
        return;
      }

      const updateUser = {
        ...userData,
        password: newPassword,
      };

      await fetch(`http://localhost:8080/api/v1/user/update/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUser),
      });

      message.success('Cập nhật mật khẩu thành công.');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      handleLogout();
    } catch (error) {
      console.error(error);
      message.error('Đã xảy ra lỗi khi cập nhật mật khẩu.');
    }
  };

  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chỉnh sửa mật khẩu</h1>
      <WrapperContainer>
        <Form onSubmit={handleSubmit} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }}>
          <Form.Item label="Mật khẩu cũ">
            <StyleInputPassword type="password" name="oldPassword" value={oldPassword} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Mật khẩu mới">
            <StyleInputPassword type="password" name="newPassword" value={newPassword} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Nhập lại mật khẩu mới">
            <StyleInputPassword type="password" name="confirmNewPassword" value={confirmNewPassword} onChange={handleChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div onClick={handleSubmit}>
              <Button type="primary" htmlType="submit">Cập nhật mật khẩu</Button>
            </div>
          </Form.Item>
        </Form>
      </WrapperContainer>
    </div>
  );
};

export default ChangePassword;
