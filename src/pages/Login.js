// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Card title="Admin Login" style={{ maxWidth: 400, margin: '0 auto' }}>
      <Form>
        <Form.Item label="Username">
          <Input value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleLogin}>Login</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;
