import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import { WrapperContainer, StyleInputPassword } from './style';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const userID = localStorage.getItem('userID');
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
  const [validatePass, setvalidatePass] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmNewPassword') setConfirmNewPassword(value);
  };

  const handleLogout = async () => {
    try {
      // Clear user data from localStorage or any other state management
      localStorage.removeItem('userID');
      window.location.href = '/SignIn';
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordRegex.test(newPassword)) {
      setvalidatePass(false);

      return;
    }

    if (newPassword !== confirmNewPassword) {
      message.error('Mật khẩu mới và nhập lại mật khẩu mới không khớp.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/change-password/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword: confirmNewPassword
        }),
      });

      if (response.ok) {
        message.success('Cập nhật mật khẩu thành công.');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        handleLogout();
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'Đã xảy ra lỗi khi cập nhật mật khẩu.');
      }
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
            {!validatePass && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Mật khẩu phải chứa ít nhất 8 kí tự bao gồm kí tự hoa, kí tự thường, chữ số và kí tự đặc biệt</p>}

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
