import React, { useState } from 'react';
import { db, auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../pages/firebase';
import { GoogleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Input, Form, Typography, Modal } from 'antd';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/Auth.css';

const { Title } = Typography;

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setIsModalVisible(true);
      // Save user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email: user.email,
      });
    } catch (error) {
      console.error("Error signing up: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    setIsModalVisible(false);
  };

  return (
    <div className="auth-container">
      <Title level={2}>Welcome to Chat App</Title>
      <Button className="google-btn" onClick={signInWithGoogle} icon={<GoogleOutlined />} loading={loading}>Sign In with Google</Button>
      <Form className="auth-form">
        <Form.Item>
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSignUp} block loading={loading}>Sign Up</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSignIn} block loading={loading}>Sign In</Button>
        </Form.Item>
      </Form>
      <Modal title="Enter your display name" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
        <Input placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </Modal>
    </div>
  );
};

export default Auth;
