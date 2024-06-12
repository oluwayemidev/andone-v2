import React, { useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../pages/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "../../styles/Login.css"; // Ensure you have this CSS file for custom styles

const { Title } = Typography;

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.emailOrPhone,
        values.password
      );
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      navigate("/admin"); // Navigate after successful signup
    } catch (error) {
      console.error("Signup failed:", error);
      setLoading(false);
      notification.error({ message: "Signup failed", description: error.message });
    }
  };

  const signupWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      navigate("/admin"); // Navigate after successful signup
    } catch (error) {
      console.error("Signup with Google failed:", error);
      setLoading(false);
      notification.error({ message: "Signup with Google failed", description: error.message });
    }
  };

  return (
    <div className="login-container">
      <Title level={2} className="login-title">Sign up</Title>
      <Form form={form} onFinish={onFinish} className="login-form">
        <Form.Item
          name="emailOrPhone"
          rules={[{ required: true, message: "Please input your email or phone!" }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email or Phone Number" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">Sign up</Button>
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" onClick={signupWithGoogle}>Sign up with Google</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
