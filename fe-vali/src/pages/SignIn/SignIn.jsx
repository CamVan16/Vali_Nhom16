import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { WrapperContainer } from './style';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleSignIn = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            const { email, password } = values;
            const response = await fetch('http://localhost:8080/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            const data = await response.json();
            localStorage.setItem('userID', data._id);
            navigate('/ProductPages');
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <WrapperContainer>
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Đăng nhập</h1>
            <Form
                form={form}
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
            >
                <Form.Item
                    label="Tài khoản"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên tài khoản!',
                        },
                    ]}
                >
                    <Input />
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
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 9, span: 15 }}>
                    <Button type="primary" onClick={handleSignIn} loading={loading}>
                        Đăng nhập
                    </Button>
                </Form.Item>

                <p>Chưa có tài khoản? <Link to="/Register">Đăng ký</Link></p>
            </Form>
        </WrapperContainer>
    );
};

export default SignIn;