import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import { StyleInput, StyleContainer, StyleRightCon } from './style';
import axios from 'axios'; // Import Axios for making HTTP requests
import { StyleInput, StyleInputPassword, StyleContainer, StyleRightCon } from './style';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        address: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordMatch, setPasswordMatch] = useState(true);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    const [validatePass, setvalidatePass] = useState(true);
    const [emailExistError, setEmailExistError] = useState(true);
    const [usernameExistError, setUsernameExistError] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (!passwordRegex.test(formData.password)) {
            setvalidatePass(false);
            setUsernameExistError(true);
            setEmailExistError(true);
            setPasswordMatch(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/user/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (error) {
                throw new Error('Invalid JSON response: ' + text);
            }

            if (response.ok) {
                if (data.status === 'ERR') {
                    if (data.message.includes('username')) {
                        setUsernameExistError(false);
                        setEmailExistError(true);
                        setPasswordMatch(true);
                        setvalidatePass(true);
                    } else if (data.message.includes('email')) {
                        setEmailExistError(false);
                        setUsernameExistError(true);
                        setPasswordMatch(true);
                        setvalidatePass(true);
                    } else if (data.message.includes('password')) {
                        setPasswordMatch(false);
                        setEmailExistError(true);
                        setUsernameExistError(true);
                        setvalidatePass(true);
                    } else {
                        message.error(data.message);
                    }
                } else {
                    setFormData({
                        username: '',
                        email: '',
                        mobile: '',
                        address: '',
                        password: '',
                        confirmPassword: '',
                    });
                    // Redirect to SignIn page
                    window.location.href = '/SignIn';
                }
            } else {
                message.error(data.message || 'Đã có lỗi xảy ra');
            }

        } catch (error) {
            console.error('Error:', error);
            message.error('Registration failed! ' + error.message);
        }
    };

    return(
        <StyleContainer>
            <StyleRightCon>
                <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A93FF' }}>Đăng ký</h4>
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        label="Tên tài khoản"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 17 }}>
                        <StyleInput name="username" value={formData.username} onChange={handleChange} />
                        {!usernameExistError && <p style={{ color: 'red', margin: '5px 0 0 0' }}>tài khoản đã tồn tại</p>}
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                                type: 'email'
                            },
                        ]}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 17 }}>
                        <StyleInput name="email" value={formData.email} onChange={handleChange} />
                        {!emailExistError && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Email đã tồn tại</p>}
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 17 }}>
                        <StyleInput name="mobile" value={formData.mobile} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 17 }}>
                        <StyleInput name="address" value={formData.address} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 17 }}>
                        <StyleInputPassword name="password" value={formData.password} onChange={handleChange} />
                        {!validatePass && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Mật khẩu phải chứa ít nhất 8 kí tự bao gồm kí tự hoa, kí tự thường, chữ số và kí tự đặc biệt</p>}
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your confirm pasword!',
                            },
                        ]}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 17 }}>
                        <StyleInputPassword name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        {!passwordMatch && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Mật khẩu xác nhận không khớp</p>}
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                        <Button type="primary" htmlType="submit">Đăng ký</Button>
                    </Form.Item>
                    <p style={{ textAlign: 'center' }}>Đã có tài khoản? <Link to="/SignIn">Đăng nhập</Link></p>
                </Form>
            </StyleRightCon>
        </StyleContainer>
    );
}

export default SignUp;
