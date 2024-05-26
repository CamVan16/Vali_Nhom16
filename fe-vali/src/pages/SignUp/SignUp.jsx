import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import { StyleInput, WrapperContainer, StyleFormContainer, StyledButton, StyledHeading } from './style';
import axios from 'axios';
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

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            message.error('Passwords do not match!');
            return;
        }

        const { username, email, address, mobile, password } = formData;

        const userData = {
            username,
            email,
            addresses: [{ name: username, address, mobile }],
            mobile,
            password
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/save', userData);
            console.log(response.data);
            message.success('User registered successfully!');
            window.location.href = '/SignIn';
        } catch (error) {
            console.error('Error:', error);
            message.error('Registration failed!');
        }
    };

    return (
        <WrapperContainer>
            <StyleFormContainer>
                <StyledHeading>Đăng ký</StyledHeading>
                <Form onSubmit={handleSubmit}>
                    <Form.Item
                        label="Tên tài khoản"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <StyleInput name="username" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <StyleInput name="email" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <StyleInput name="address" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mobile number!',
                            },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <StyleInput name="mobile" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <StyleInput name="password" type="password" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <StyleInput name="confirmPassword" type="password" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <StyledButton type="primary" htmlType="submit" onClick={handleSubmit}>Đăng ký</StyledButton>
                    </Form.Item>
                    <p style={{ textAlign: 'center' }}>Đã có tài khoản? <Link to="/SignIn">Đăng nhập</Link></p>

                </Form>
            </StyleFormContainer>
        </WrapperContainer>
    );
};

export default SignUp;
