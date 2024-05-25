import React from 'react';
import { Form, Input, Button } from 'antd';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form] = Form.useForm();
    const { register } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        await register(values.name, values.email, values.phoneNumber, values.password);
        navigate('/chat');
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                <Input placeholder="Phone Number" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Signup;
