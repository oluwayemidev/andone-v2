import React, { useState, useEffect } from 'react';
import { Carousel, Card, Row, Col, Form, Input, Button, Select, DatePicker, message, Skeleton } from 'antd';
import { db, collection, getDocs } from '../pages/firebase';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { submitQuotation } from '../utils/api';
import '../styles/SliderCarousel.css';

const { Option } = Select;
const { TextArea } = Input;

const SliderCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [carouselItems, setCarouselItems] = useState([]);
  const [inputForm] = Form.useForm();

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const fetchCarouselItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'carouselItems'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sortedItems = items.sort((b, a) => new Date(b.createdAt) - new Date(a.createdAt));
      setCarouselItems(sortedItems);
    } catch (error) {
      console.error('Error fetching carousel items:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    inputForm.resetFields();
    setLoading(true);
    try {
      const formattedValues = { ...values, installation_date: values.installation_date.toDate() };
      await submitQuotation(formattedValues);
      message.success('Quotation submitted successfully');
    } catch (error) {
      console.error('Error submitting quotation:', error);
      message.error('Failed to submit quotation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="" bordered={false} className="carousel-card">
      <Row gutter={16}>
        <Col xs={24} md={24}>
          {loading ? (
            <div className="skeleton-carousel-image">
              <Skeleton.Image active block size='large' className='image' />
              <Skeleton active className='write-up' />
            </div>
          ) : (
            <Carousel autoplay effect="fade" className="overlay">
              {carouselItems.map((item, index) => (
                <div key={index} className="carousel-slide">
                  <img src={item.imgSrc} alt={item.altText} className="carousel-image" />
                  <div className="carousel-caption">
                    <h3>{item.caption}</h3>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </Col>
        <Col className="cta-container" xs={24} md={10}>
          <div className="cta-form-container">
            <h2>Get a Quotation</h2>
            <Form form={inputForm} layout="vertical" onFinish={onFinish} style={{ width: '100%' }}>
              <Row gutter={10}>
                <Col xs={24} sm={12}>
                  <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input prefix={<UserOutlined />} placeholder="Enter your name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}>
                    <Input prefix={<MailOutlined />} type="email" placeholder="Enter your email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col xs={24} sm={12}>
                  <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                    <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please input your location!' }]}>
                    <Input prefix={<EnvironmentOutlined />} placeholder="Location" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col xs={24} sm={12}>
                  <Form.Item name="product" label="Product" rules={[{ required: true, message: 'Please select a product!' }]}>
                    <Select placeholder="Select a product">
                      <Option value="solar_panel">Solar Panel</Option>
                      <Option value="battery">Battery</Option>
                      <Option value="inverter">Inverter</Option>
                      <Option value="accessory">Accessory</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="installation_date" label="Preferred Installation Date" rules={[{ required: true, message: 'Please select a date!' }]}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col xs={24}>
                  <Form.Item name="message" label="Additional Message">
                    <TextArea rows={2} placeholder="Enter your message" />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Get Quote
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default SliderCarousel;
