import React from 'react';
import { Layout, Row, Col, Form, Input, Button, Typography } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { animated } from '@react-spring/web';
import { useSpring } from '@react-spring/core';
import '../styles/Contact.css';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const ContactPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form values: ', values);
    // Here you can handle form submission, e.g., sending the data to an API
  };

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
          style={{ color: "white", lineHeight: "64px", textAlign: "center" }}
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
              <Form form={form} layout="vertical" onFinish={handleSubmit} className="contact-form">
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input placeholder="Your Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}
                >
                  <Input placeholder="Your Email" />
                </Form.Item>
                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[{ required: true, message: 'Please enter the subject' }]}
                >
                  <Input placeholder="Subject" />
                </Form.Item>
                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <Input.TextArea rows={4} placeholder="Your Message" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
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
                  Nigeria.
                </Paragraph>
                <Paragraph>
                  <PhoneOutlined style={{ marginRight: 8 }} />
                  (123) 456-7890
                </Paragraph>
                <Paragraph>
                  <MailOutlined style={{ marginRight: 8 }} />
                  info@andonesolar.com
                </Paragraph>
                <Title level={4} style={{ marginTop: '40px' }}>Business Hours</Title>
                <Paragraph>Monday - Friday: 9:00 AM - 5:00 PM</Paragraph>
                <Paragraph>Saturday: 10:00 AM - 4:00 PM</Paragraph>
                <Paragraph>Sunday: Closed</Paragraph>
              </div>
            </animated.div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ContactPage;
