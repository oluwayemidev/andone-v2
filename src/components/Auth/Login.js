import React from 'react';
import { Form, Input, Button } from 'antd';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form] = Form.useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        await login(values.emailOrPhone, values.password);
        navigate('/chat');
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="emailOrPhone" rules={[{ required: true, message: 'Please input your email or phone!' }]}>
                <Input placeholder="Email or Phone Number" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
