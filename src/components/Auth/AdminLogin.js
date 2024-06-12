import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../pages/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "../../styles/Login.css"; // Ensure you have this CSS file for custom styles

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.uid) {
        navigate("/admin"); // Redirect to admin route if user is already logged in
      }
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.emailOrPhone,
        values.password
      );
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      navigate("/admin"); // Navigate after successful login
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      notification.error({ message: "Login failed", description: error.message });
    }
  };

//   const loginWithGoogle = async () => {
//     setLoading(true);
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       localStorage.setItem('user', JSON.stringify(user));
//       setLoading(false);
//       navigate("/admin"); // Navigate after successful login
//     } catch (error) {
//       console.error("Login with Google failed:", error);
//       setLoading(false);
//       notification.error({ message: "Login with Google failed", description: error.message });
//     }
//   };

  return (
    <div className="login-container">
      <Title level={2} className="login-title">Login</Title>
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
          <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">Login</Button>
        </Form.Item>
        {/* <Form.Item>
          <Button loading={loading} type="primary" onClick={loginWithGoogle}>Login with Google</Button>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default Login;
