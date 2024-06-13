import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { animated } from '@react-spring/web';
import { useSpring } from '@react-spring/core';
import { db, collection, addDoc, doc, getDoc } from './firebase';  // Import Firestore functions
import '../styles/Contact.css';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const ContactPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [contactDetails, setContactDetails] = useState({});

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Add a new document with the form values to Firestore
      await addDoc(collection(db, 'contacts'), {
        ...values,
        status: 'unread',
        createdAt: new Date().toISOString()
      });
      message.success('Message sent successfully!');
      form.resetFields(); // Reset the form fields
    } catch (error) {
      message.error('Failed to send message.');
    }
    setLoading(false);
  };

  const fetchContactDetails = async () => {
    const docRef = doc(db, 'pages', 'contactDetails');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setContactDetails(docSnap.data());
    } else {
      message.error('No contact details found!');
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  // Animation for form
  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="contact-header">
        <Title
          level={2}
          style={{ color: 'white', lineHeight: '64px', textAlign: 'center' }}
        >
          Contact Us
        </Title>
      </Header>
      <Content className="contact-content">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <Title level={2}>Get In Touch</Title>
          <Paragraph>
            We’d love to hear from you! Whether you have a question about our services, pricing, need a demo, or anything else, our team is ready to answer all your questions.
          </Paragraph>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <animated.div style={formAnimation}>
              <Form form={form} name="contact" layout="vertical" onFinish={handleSubmit} className="contact-form">
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Your Name" style={{ background: 'transparent' }} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Your Email" style={{ background: 'transparent' }} />
                </Form.Item>
                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[{ required: true, message: 'Please enter the subject' }]}
                >
                  <Input prefix={<FileTextOutlined />} placeholder="Subject" style={{ background: 'transparent' }} />
                </Form.Item>
                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <Input.TextArea rows={4} placeholder="Your Message" style={{ background: 'transparent' }} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} block>
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </animated.div>
          </Col>
          <Col xs={24} md={12}>
            <animated.div style={formAnimation}>
              <div className="contact-info">
                <Title level={4}>Contact Information</Title>
                <Paragraph>
                  <EnvironmentOutlined style={{ marginRight: 8 }} />
                  {contactDetails.address || 'Loading...'}
                </Paragraph>
                <Paragraph>
                  <PhoneOutlined style={{ marginRight: 8 }} />
                  {contactDetails.phone || 'Loading...'}
                </Paragraph>
                <Paragraph>
                  <MailOutlined style={{ marginRight: 8 }} />
                  {contactDetails.email || 'Loading...'}
                </Paragraph>
                <Title level={4} style={{ marginTop: '40px' }}>Business Hours</Title>
                <Paragraph>Monday - Friday: {contactDetails.businessHours?.mondayFriday || 'Loading...'}</Paragraph>
                <Paragraph>Saturday: {contactDetails.businessHours?.saturday || 'Loading...'}</Paragraph>
                <Paragraph>Sunday: {contactDetails.businessHours?.sunday || 'Loading...'}</Paragraph>
              </div>
            </animated.div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ContactPage;
