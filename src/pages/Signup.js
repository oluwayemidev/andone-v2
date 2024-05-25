import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const SignUp = () => {
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/auth/signup', values);
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <Card title="Sign Up" style={{ width: 300, margin: '0 auto', marginTop: '100px' }}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Sign Up</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignUp;
