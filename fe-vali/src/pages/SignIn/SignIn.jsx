import React, { useState } from 'react';
import { Button, Form, message, Checkbox } from 'antd';
import { StyleContainer, StyleRightCon, StyleInput, StyleInputPassword } from './style';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/slides/userSlide.js';
import { useDispatch } from 'react-redux';

const SignIn = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [check, setCheck] = useState(false);

    const handleSignIn = async (values) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (data._id) {
                message.success('Login success');
                dispatch(updateUser(data)); // Dispatch action to update Redux state
                if (location?.state) {
                    navigate(location.state);
                } else {
                    navigate('/UserPage');
                }
            } else {
                setCheck(true);
                message.error(data.message || 'Login fail');
            }
        } catch (error) {
            console.error('Error during login:', error);
            message.error('Đã xảy ra lỗi, vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const onFinish = (values) => {
        handleSignIn(values);
    };

    return (
        <StyleContainer>
            <StyleRightCon>
                <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A93FF' }}>Đăng nhập</h4>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên tài khoản!',
                            },
                        ]}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}>
                        <StyleInput />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        validateStatus={check ? 'error' : ''}
                        help={check && 'Tài khoản hoặc mật khẩu không chính xác'}>
                        <StyleInputPassword />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox checked={rememberMe} onChange={handleCheckboxChange}>Ghi nhớ thông tin đăng nhập</Checkbox>
                        <p><Link to="/ForgotPassword">Quên mật khẩu?</Link></p>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <p style={{ textAlign: 'center' }}>Chưa có tài khoản? <Link to="/">Đăng ký</Link></p>
                </Form>
            </StyleRightCon>
        </StyleContainer>
    );
};

export default SignIn;
