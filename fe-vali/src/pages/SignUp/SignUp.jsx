import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import { StyleInput, StyleContainer, StyleRightCon, StyleInputPassword } from './style';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        //address: '',
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

        const { username, email, mobile, password } = formData;
        //const hashedNewPassword = await bcrypt.hash(password, 10); 

        const userData = {
            username,
            email,
            //addresses: [{ name: username, address, mobile }],
            mobile,
            //password: hashedNewPassword,
            password
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/save', userData);
            console.log(response.data);
            message.success('User registered successfully!');
            window.location.href = '/SignIn';
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
                    {/* <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <StyleInput name="address" onChange={handleChange} />
                    </Form.Item> */}
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
