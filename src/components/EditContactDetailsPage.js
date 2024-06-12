import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Typography, message } from 'antd';
import { db, doc, getDoc, setDoc } from '../pages/firebase';
import '../styles/Contact.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const EditContactDetailsPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  const fetchContactDetails = async () => {
    const docRef = doc(db, 'pages', 'contactDetails');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setInitialValues(docSnap.data());
      form.setFieldsValue(docSnap.data());
    } else {
      message.error('No contact details found!');
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'pages', 'contactDetails'), values);
      message.success('Contact details updated successfully!');
    } catch (error) {
      message.error('Failed to update contact details.');
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
          Edit Contact Details
        </Title>
      </Header>
      <Content className="contact-content">
        {initialValues && (
          <Form
            form={form}
            name="editContactDetails"
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={initialValues}
          >
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter the address' }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter the phone number' }]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter the email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name={['businessHours', 'mondayFriday']}
              label="Business Hours (Monday - Friday)"
              rules={[{ required: true, message: 'Please enter business hours for Monday - Friday' }]}
            >
              <Input placeholder="Monday - Friday" />
            </Form.Item>
            <Form.Item
              name={['businessHours', 'saturday']}
              label="Business Hours (Saturday)"
              rules={[{ required: true, message: 'Please enter business hours for Saturday' }]}
            >
              <Input placeholder="Saturday" />
            </Form.Item>
            <Form.Item
              name={['businessHours', 'sunday']}
              label="Business Hours (Sunday)"
              rules={[{ required: true, message: 'Please enter business hours for Sunday' }]}
            >
              <Input placeholder="Sunday" />
            </Form.Item>
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

export default EditContactDetailsPage;
