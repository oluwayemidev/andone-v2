import React, { useState } from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../../styles/Signup.css'; // Ensure you have this CSS file for custom styles

const { Title } = Typography;

const Signup = () => {
    const [form] = Form.useForm();
    const { register } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await register(values.name, values.email, values.phoneNumber, values.password);
            setLoading(false);
            navigate('/admin'); // Navigate after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
            setLoading(false);
            notification.error({ message: 'Registration failed', description: error.response.data.message });
        }
    };

    return (
        <div className="signup-container">
            <Title level={2} className="signup-title">Sign Up</Title>
            <Form form={form} onFinish={onFinish} className="signup-form">
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Name"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        placeholder="Phone Number"
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
                    <Button loading={loading} type="primary" htmlType="submit" className="signup-form-button">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Signup;
