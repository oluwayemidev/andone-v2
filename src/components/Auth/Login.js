import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css'; // Ensure you have this CSS file for custom styles

const { Title } = Typography;

const Login = () => {
    const [form] = Form.useForm();
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/admin'); // If user is already logged in, navigate to /admin
        }
    }, [user, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await login(values.emailOrPhone, values.password)
                .then (() => setLoading(false))
                .then (() => navigate('/admin')); // Navigate after successful login
        } catch (error) {
            console.error('Login failed:', error);
            setLoading(false);
            notification.error({ message: 'Registration failed', description: error.response.data.message });
            // Handle login error, such as displaying error message to user
        }
    };

    return (
        <div className="login-container">
            <Title level={2} className="login-title">Login</Title>
            <Form form={form} onFinish={onFinish} className="login-form">
                <Form.Item
                    name="emailOrPhone"
                    rules={[{ required: true, message: 'Please input your email or phone!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Email or Phone Number"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
