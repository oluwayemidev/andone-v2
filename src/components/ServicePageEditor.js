import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Typography, message, Skeleton, Alert, Space, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { db, doc, getDoc, setDoc } from '../pages/firebase';

const { Title, Paragraph } = Typography;

const ServicePageEditor = () => {
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const docRef = doc(db, 'pages', 'services');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setServices(data.services || []); // Ensure services is an array
        } else {
          setError('No such document!');
        }
      } catch (error) {
        setError('Error getting document: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'pages', 'services'), { services });
      message.success('Service page updated successfully');
    } catch (error) {
      message.error('Error updating service page: ' + error.message);
    } finally {
        setLoading(false);
    }
  };

  const handleAddService = () => {
    const newService = { title: '', description: '', icon: '' };
    setServices([...services, newService]);
  };

  const handleDeleteService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleChange = (index, key, value) => {
    const newServices = [...services];
    newServices[index][key] = value;
    setServices(newServices);
  };

  if (loading) {
    return <Skeleton active />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <Card title="Edit Service Page" bordered={false} style={{ width: '100%' }}>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        {services.map((service, index) => (
          <Card key={index} bordered={false} style={{ marginBottom: 24 }}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Title" required>
                  <Input value={service.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Description" required>
                  <Input.TextArea value={service.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Icon (Ant Design Icon Name)" required>
                  <Input value={service.icon} onChange={(e) => handleChange(index, 'icon', e.target.value)} />
                </Form.Item>
              </Col>
            </Row>
            <Space>
              <Popconfirm title="Are you sure you want to delete this service?" onConfirm={() => handleDeleteService(index)} okText="Yes" cancelText="No">
                <Button type="danger" icon={<DeleteOutlined />}>Delete</Button>
              </Popconfirm>
            </Space>
          </Card>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={handleAddService} icon={<PlusOutlined />}>Add Service</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ServicePageEditor;
