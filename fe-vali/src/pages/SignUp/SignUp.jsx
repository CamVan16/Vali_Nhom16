import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import { StyleInput, WrapperContainer, StyleFormContainer, StyledButton, StyledHeading, StyleInputPassword } from './style';
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
    const [passwordMatch, setPasswordMatch] = useState(true);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    const [validatePass, setValidatePass] = useState(true);
    const [emailExistError, setEmailExistError] = useState(true);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!passwordRegex.test(formData.password)) {
            setValidatePass(false);
            setEmailExistError(true);
            setPasswordMatch(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            setValidatePass(true);
            setEmailExistError(true);
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
            if (response.status === 201) {
                setFormData({
                    username: '',
                    email: '',
                    address: '',
                    mobile: '',
                    password: '',
                    confirmPassword: '',
                });
                message.success('User registered successfully!');
                window.location.href = '/SignIn';
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    const responseData = error.response.data;
                    if (responseData === 'Email đã tồn tại, vui lòng nhập email khác') {
                        setEmailExistError(false);
                        setPasswordMatch(true);
                        setValidatePass(true);
                    } 
                } else {
                    message.error('Đăng kí không thành công.');
                }
            } else {
                message.error('Đã có lỗi xảy ra');
            }
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
                        {!emailExistError && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Email đã tồn tại</p>}
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
                        <StyleInputPassword name="password" type="password" onChange={handleChange} />
                        {!validatePass && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Mật khẩu phải chứa ít nhất 8 kí tự bao gồm kí tự hoa, kí tự thường, chữ số và kí tự đặc biệt</p>}
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
                        <StyleInputPassword name="confirmPassword" type="password" onChange={handleChange} />
                        {!passwordMatch && <p style={{ color: 'red', margin: '5px 0 0 0' }}>Mật khẩu xác nhận không khớp</p>}
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
