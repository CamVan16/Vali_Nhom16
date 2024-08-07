import React, { useState, useEffect } from 'react';
import { Form, message, Checkbox } from 'antd';
import { WrapperContainer, StyleFormContainer, StyleInput, StyleInputPassword, StyledButton, StyledHeading } from './style';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/slices/userSlide.js';
import { useSelector, useDispatch } from 'react-redux';

const SignIn = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        setLoginError(false);
    }, [form.getFieldValue('email')]);

    const handleSignIn = async (values) => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            const { email, password } = values;
            const response = await fetch(`http://localhost:8080/api/v1/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log("data received: ", data);

            if (data._id) {
                setLoginError(false);
                const _id = data._id;
                localStorage.setItem('userID', _id);
                const isAdmin = data.isAdmin;
                if (isAdmin) {
                    localStorage.setItem('isAdmin', isAdmin);
                }
                if (rememberMe) { 
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('email', email);
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('email');
                }

                dispatch(updateUser(data));
                if (location?.state) {
                    navigate(location.state);
                } else {
                    navigate('/');
                }
            } else {
                setLoginError(true);
                message.error(data.message || 'Login fail');
            }
        } catch (error) {
            setLoginError(true);
            console.error('Error during login:', error);
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

    useEffect(() => {
        const rememberMeEnabled = localStorage.getItem('rememberMe') === 'true';
        if (rememberMeEnabled) {
            const rememberedUsername = localStorage.getItem('email');
            if (rememberedUsername) {
                form.setFieldsValue({ email: rememberedUsername });
                setRememberMe(true);
            }
        }
    }, []);

    return (
        <WrapperContainer>
            <StyleFormContainer>
                <StyledHeading>Đăng nhập</StyledHeading>
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
                        validateStatus={loginError ? 'error' : ''}
                        help={loginError && 'Tài khoản hoặc mật khẩu không chính xác'}>
                        <StyleInputPassword />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <Checkbox checked={rememberMe} onChange={handleCheckboxChange}>Ghi nhớ thông tin đăng nhập</Checkbox>
                        <p><Link to="/ForgotPassword">Quên mật khẩu?</Link></p>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <StyledButton type="primary" htmlType="submit" loading={loading}>
                            Đăng nhập
                        </StyledButton>
                    </Form.Item>

                    <p style={{ textAlign: 'center' }}>Chưa có tài khoản? <Link to="/SignUp">Đăng ký</Link></p>
                </Form>
            </StyleFormContainer>
        </WrapperContainer>
    );
};

export default SignIn;
