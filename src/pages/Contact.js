import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { animated } from '@react-spring/web';
import { useSpring } from '@react-spring/core';
import { db, collection, addDoc, doc, getDoc } from './firebase';  // Import Firestore functions
import '../styles/Contact.css';
import translateText from '../translationService';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const ContactPage = ({ language }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [contactDetails, setContactDetails] = useState({});
  const [translatedTexts, setTranslatedTexts] = useState({});
  
  const textsToTranslate = {
    contactUs: "Contact Us",
    getInTouch: "Get In Touch",
    weLoveToHear: "We’d love to hear from you! Whether you have a question about our services, pricing, need a demo, or anything else, our team is ready to answer all your questions.",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    sendMessage: "Send Message",
    contactInformation: "Contact Information",
    businessHours: "Business Hours",
    mondayFriday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday"
  };

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
    try {
      const docRef = doc(db, 'pages', 'contactDetails');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // Translate the data fields
        const translatedData = {
          address: await translateText(data.address, language),
          phone: await translateText(data.phone, language),
          email: await translateText(data.email, language),
          businessHours: {
            mondayFriday: await translateText(data.businessHours.mondayFriday, language),
            saturday: await translateText(data.businessHours.saturday, language),
            sunday: await translateText(data.businessHours.sunday, language)
          }
        };

        setContactDetails(translatedData);
      } else {
        message.error('No contact details found!');
      }
    } catch (error) {
      message.error('Error getting contact details: ' + error.message);
    }
  };

  useEffect(() => {
    const translateAllTexts = async () => {
      setLoading(true); // Start loader
      const translations = {};

      for (const key in textsToTranslate) {
        translations[key] = await translateText(
          textsToTranslate[key],
          language
        );
      }

      setTranslatedTexts(translations);
      setLoading(false); // Stop loader
    };

    translateAllTexts();
    fetchContactDetails();
  }, [language]);

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
          {translatedTexts.contactUs || textsToTranslate.contactUs}
        </Title>
      </Header>
      <Content className="contact-content">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <Title level={2}>{translatedTexts.getInTouch || textsToTranslate.getInTouch}</Title>
          <Paragraph>
            {translatedTexts.weLoveToHear || textsToTranslate.weLoveToHear}
          </Paragraph>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <animated.div style={formAnimation}>
              <Form form={form} name="contact" layout="vertical" onFinish={handleSubmit} className="contact-form">
                <Form.Item
                  name="name"
                  label={translatedTexts.name || textsToTranslate.name}
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder={translatedTexts.name || textsToTranslate.name} style={{ background: 'transparent' }} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={translatedTexts.email || textsToTranslate.email}
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder={translatedTexts.email || textsToTranslate.email} style={{ background: 'transparent' }} />
                </Form.Item>
                <Form.Item
                  name="subject"
                  label={translatedTexts.subject || textsToTranslate.subject}
                  rules={[{ required: true, message: 'Please enter the subject' }]}
                >
                  <Input prefix={<FileTextOutlined />} placeholder={translatedTexts.subject || textsToTranslate.subject} style={{ background: 'transparent' }} />
                </Form.Item>
                <Form.Item
                  name="message"
                  label={translatedTexts.message || textsToTranslate.message}
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <Input.TextArea rows={4} placeholder={translatedTexts.message || textsToTranslate.message} style={{ background: 'transparent' }} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} block>
                    {translatedTexts.sendMessage || textsToTranslate.sendMessage}
                  </Button>
                </Form.Item>
              </Form>
            </animated.div>
          </Col>
          <Col xs={24} md={12}>
            <animated.div style={formAnimation}>
              <div className="contact-info">
                <Title level={4}>{translatedTexts.contactInformation || textsToTranslate.contactInformation}</Title>
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
                <Title level={4} style={{ marginTop: '40px' }}>{translatedTexts.businessHours || textsToTranslate.businessHours}</Title>
                <Paragraph>{translatedTexts.mondayFriday || textsToTranslate.mondayFriday}: {contactDetails.businessHours?.mondayFriday || 'Loading...'}</Paragraph>
                <Paragraph>{translatedTexts.saturday || textsToTranslate.saturday}: {contactDetails.businessHours?.saturday || 'Loading...'}</Paragraph>
                <Paragraph>{translatedTexts.sunday || textsToTranslate.sunday}: {contactDetails.businessHours?.sunday || 'Loading...'}</Paragraph>
              </div>
            </animated.div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ContactPage;
