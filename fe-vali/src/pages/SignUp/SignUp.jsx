import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import { StyleInput, StyleContainer, StyleRightCon } from './style';
import axios from 'axios'; // Import Axios for making HTTP requests

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
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/save', formData); // Adjust the URL accordingly
            console.log(response.data);
            message.success('User registered successfully!');
            window.location.href = '/SignIn';

        } catch (error) {
            console.error('Error:', error);
            message.error('Registration failed!');
        }
    };

    return(
        <StyleContainer>
            <StyleRightCon>
                <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Đăng ký</h3>
                <Form>
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
                                message: 'Please input your username!',
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
                                message: 'Please input your username!',
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
                                message: 'Please input your username!',
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
                                message: 'Please input your username!',
                            },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <StyleInput name="password" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <StyleInput name="confirmPassword" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
                        <div onClick={handleSubmit}><Button type="primary" htmlType="submit">Đăng ký</Button></div>
                    </Form.Item>
                </Form>
            </StyleRightCon>
        </StyleContainer>
    );
}

export default SignUp;
