import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Login.css'; // Ensure you have this CSS file for custom styles

const { Title } = Typography;

const Login = () => {
    const [form] = Form.useForm();
    // const { user, login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('https://andonesolar.onrender.com/api/auth/login', values)
            localStorage.setItem('token', response.data.token)
            setUser(response.data)
            setLoading(false)
            navigate('/admin'); // Navigate after successful login
        } catch (error) {
            console.error('Login failed:', error);
            setLoading(false);
            notification.error({ message: 'Registration failed', description: error.response.data.message });
            // Handle login error, such as displaying error message to user
        }
    };
    
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await axios.get('https://andonesolar.onrender.com/api/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(data);
                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('token');
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchUser();
        if (user) {
            console.log(user)
            navigate('/admin'); // If user is already logged in, navigate to /admin
        }
    }, [user, navigate]);

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
