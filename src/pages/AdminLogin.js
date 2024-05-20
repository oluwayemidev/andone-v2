import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', values);
      if (data.isAdmin) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/admin/overview');
      } else {
        message.error('Not authorized as an admin');
      }
    } catch (error) {
      message.error('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '1rem' }}>
      <Title level={2}>Admin Login</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLogin;
