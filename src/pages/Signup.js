import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignup = async (values) => {
    const { username, password, email } = values;
    try {
      await axios.post('http://localhost:5000/api/users/signup', { username, password, email });
      navigate('/admin');
    } catch (error) {
      setError('Signup failed: ' + error.response.data.message);
    }
  };

  return (
    <Card title="Admin Signup" style={{ maxWidth: 400, margin: '0 auto' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form form={form} onFinish={handleSignup}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
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
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Sign Up</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignupPage;
