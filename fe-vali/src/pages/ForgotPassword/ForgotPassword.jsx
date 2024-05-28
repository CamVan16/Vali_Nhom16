import React, { useState, useEffect } from 'react';
import { Button, Form, message } from 'antd';
import { WrapperContainer, StyleFormContainer, StyleInput, StyledButton, StyledHeading } from './style';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [checkEmail, setCheckEmail] = useState(false);

    useEffect(() => {
        // Xóa trạng thái lỗi email khi người dùng thay đổi giá trị email
        setCheckEmail(false);
    }, [form.getFieldValue('email')]);

    const handleSendEmail = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/v1/user/forgot-password?email=${values.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                message.success(data.message || 'Mật khẩu mới đã được gửi đến email của bạn.');
                navigate('/SignIn');
            } else {
                message.error(data.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
                setCheckEmail(true);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            message.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    return (
        <WrapperContainer>
            <StyleFormContainer>
                <StyledHeading>Quên mật khẩu</StyledHeading>
                <Form form={form}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email đã đăng ký!',
                            },
                        ]}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        validateStatus={checkEmail ? 'error' : ''}
                        help={checkEmail && 'Email chưa được đăng ký'}
                    >
                        <StyleInput />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <StyledButton type="primary" onClick={handleSendEmail} loading={loading}>
                            Gửi
                        </StyledButton>
                    </Form.Item>

                    <p style={{ textAlign: 'center' }}>Chưa có tài khoản? <Link to="/SignUp">Đăng ký</Link></p>
                </Form>
            </StyleFormContainer>
        </WrapperContainer>
    );
};

export default ForgotPassword;
