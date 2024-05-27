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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);

    const [check, setCheck] = useState(false);
    useEffect(() => {
        // Xóa trạng thái lỗi email khi người dùng thay đổi giá trị email
        setCheck(false);
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
            if (data._id) {
                message.success('Login success');
                setCheck(true);
                const id = data._id; // Lấy _id từ dữ liệu trả về
                localStorage.setItem('userID', id);
                if (rememberMe) { // Kiểm tra trạng thái của checkbox
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('email', email); // Lưu lại thông tin đăng nhập nếu được chọn
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('email'); // Xóa thông tin đăng nhập nếu không được chọn
                }
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

    useEffect(() => {
        const rememberMeEnabled = localStorage.getItem('rememberMe') === 'true';
        if (rememberMeEnabled) {
            const rememberedUsername = localStorage.getItem('email');
            if (rememberedUsername) {
                form.setFieldsValue({ email: rememberedUsername }); // Tự động điền tên đăng nhập vào trường nhập liệu
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
                        validateStatus={check ? 'error' : ''}
                        help={check && 'Tài khoản hoặc mật khẩu không chính xác'}>
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
