import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { db, doc, getDoc, setDoc } from '../pages/firebase';

const { Title, Paragraph } = Typography;

const CompanyInfoEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "companyInfo", "info");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setParagraph1(data.paragraph1);
          setParagraph2(data.paragraph2);
          form.setFieldsValue(data);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [form]);

  const handleFormSubmit = async (values) => {
    try {
      const docRef = doc(db, "companyInfo", "info");
      await setDoc(docRef, values);
      setTitle(values.title);
      setParagraph1(values.paragraph1);
      setParagraph2(values.paragraph2);
      message.success('Company info updated successfully');
    } catch (error) {
      console.error('Error writing document:', error);
      message.error('Error updating company info');
    }
  };

  return (
    <Card title="Edit Company Info" bordered={false} style={{ width: '100%' }}>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{ title, paragraph1, paragraph2 }}>
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Paragraph 1" name="paragraph1">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Paragraph 2" name="paragraph2">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
        </Form.Item>
      </Form>
      <Card title="Preview" bordered={false} style={{ marginTop: '20px' }}>
        <Typography>
          <Title level={4}>{title}</Title>
          <Paragraph>{paragraph1}</Paragraph>
          <Paragraph>{paragraph2}</Paragraph>
        </Typography>
      </Card>
    </Card>
  );
};

export default CompanyInfoEditor;
