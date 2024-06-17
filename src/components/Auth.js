import React, { useState } from 'react';
import { auth, db, signInWithPopup, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile } from '../pages/firebase';
import { GoogleOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Input, Form, Typography, Tabs, message, Alert } from 'antd';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/Auth.css';

const { Title } = Typography;
const { TabPane } = Tabs;

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [verificationNeeded, setVerificationNeeded] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user) {
        message.error('Failed to sign in with Google. Please try again.');
        return;
      }

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });
      message.success('Signed in with Google successfully!');
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      message.error(`Error signing in with Google: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (values) => {
    try {
      setLoading(true);
      const { email, password, displayName } = values;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user) {
        message.error('Failed to sign up. Please try again.');
        return;
      }

      // Update user profile with display name
      await updateProfile(user, { displayName });

      // Send email verification
      await sendEmailVerification(user);

      // Save user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email: user.email,
      });

      message.success('Sign up successful! Please check your email to verify your account.');
      setVerificationNeeded(true);
    } catch (error) {
      console.error("Error signing up: ", error);
      if (error.code === 'auth/email-already-in-use') {
        message.error('User already exist.');
      } else {
        message.error(`Error signing up: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (values) => {
    try {
      setLoading(true);
      const { email, password } = values;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user) {
        message.error('Failed to sign in. Please try again.');
        return;
      }

      // Check if email is verified
      if (!user.emailVerified) {
        message.error('Please verify your email before signing in.');
        await auth.signOut();
        setVerificationNeeded(true);
        return;
      }

      message.success('Signed in successfully!');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        message.error('Invalid credentials.');
      } else if (error.code === 'auth/user-not-found') {
        message.error('No user found with this email. Please sign up first.');
      } else {
        message.error(`Invalid credentials.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Title level={2}>Welcome to Chat App</Title>
      {verificationNeeded && (
        <Alert
          message="Email Verification Required"
          description="Please check your email to verify your account before signing in."
          type="warning"
          showIcon
          icon={<MailOutlined />}
          closable
        />
      )}
      <Button className="google-btn" onClick={signInWithGoogle} icon={<GoogleOutlined />} loading={loading}>
        Sign In with Google
      </Button>
      <Tabs defaultActiveKey="1" className="auth-tabs">
        <TabPane tab="Sign In" key="1">
          <Form className="auth-form" onFinish={handleSignIn}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid E-mail!' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Sign Up" key="2">
          <Form className="auth-form" onFinish={handleSignUp}>
            <Form.Item
              name="displayName"
              rules={[
                { required: true, message: 'Please input your name!' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid E-mail!' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Auth;
