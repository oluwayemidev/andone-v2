import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Typography, message, Tabs } from 'antd';
import { db, doc, getDoc, setDoc } from '../pages/firebase';
import '../styles/Contact.css';

const { Header, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const SettingsWidget = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  const fetchSettings = async () => {
    const docRef = doc(db, 'settings', 'general');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setInitialValues(docSnap.data());
      form.setFieldsValue(docSnap.data());
    } else {
      message.error('No settings found!');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'general'), values);
      message.success('Settings updated successfully!');
    } catch (error) {
      message.error('Failed to update settings.');
    }
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="contact-header">
        <Title
          level={2}
          style={{ color: 'white', lineHeight: '64px', textAlign: 'center' }}
        >
          Edit Settings
        </Title>
      </Header>
      <Content className="contact-content">
        {initialValues && (
          <Form
            form={form}
            name="editSettings"
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={initialValues}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Social Media" key="1">
                <Form.Item
                  name={['socialMedia', 'facebook']}
                  label="Facebook URL"
                  rules={[{ required: true, message: 'Please enter the Facebook URL' }]}
                >
                  <Input placeholder="Facebook URL" />
                </Form.Item>
                <Form.Item
                  name={['socialMedia', 'twitter']}
                  label="Twitter URL"
                  rules={[{ required: true, message: 'Please enter the Twitter URL' }]}
                >
                  <Input placeholder="Twitter URL" />
                </Form.Item>
                <Form.Item
                  name={['socialMedia', 'instagram']}
                  label="Instagram URL"
                  rules={[{ required: true, message: 'Please enter the Instagram URL' }]}
                >
                  <Input placeholder="Instagram URL" />
                </Form.Item>
                <Form.Item
                  name={['socialMedia', 'linkedin']}
                  label="LinkedIn URL"
                  rules={[{ required: true, message: 'Please enter the LinkedIn URL' }]}
                >
                  <Input placeholder="LinkedIn URL" />
                </Form.Item>
              </TabPane>
              <TabPane tab="Business Hours" key="2">
                <Form.Item
                  name={['businessHours', 'mondayFriday']}
                  label="Monday - Friday"
                  rules={[{ required: true, message: 'Please enter business hours for Monday to Friday' }]}
                >
                  <Input placeholder="Monday - Friday" />
                </Form.Item>
                <Form.Item
                  name={['businessHours', 'saturday']}
                  label="Saturday"
                  rules={[{ required: true, message: 'Please enter business hours for Saturday' }]}
                >
                  <Input placeholder="Saturday" />
                </Form.Item>
                <Form.Item
                  name={['businessHours', 'sunday']}
                  label="Sunday"
                  rules={[{ required: true, message: 'Please enter business hours for Sunday' }]}
                >
                  <Input placeholder="Sunday" />
                </Form.Item>
              </TabPane>
              <TabPane tab="Contact Info" key="3">
                <Form.Item
                  name={['contactInfo', 'address']}
                  label="Address"
                  rules={[{ required: true, message: 'Please enter the address' }]}
                >
                  <Input placeholder="Address" />
                </Form.Item>
                <Form.Item
                  name={['contactInfo', 'phone']}
                  label="Phone"
                  rules={[{ required: true, message: 'Please enter the phone number' }]}
                >
                  <Input placeholder="Phone" />
                </Form.Item>
                <Form.Item
                  name={['contactInfo', 'email']}
                  label="Email"
                  rules={[{ required: true, message: 'Please enter the email address' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </TabPane>
            </Tabs>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Content>
    </Layout>
  );
};

export default SettingsWidget;
