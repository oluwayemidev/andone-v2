import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', values);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data.message) {  
        message.error(error.response.data.message);
      } else {
        message.error('Something went wrong');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '1rem' }}>
      <Title level={2}>Sign Up</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
