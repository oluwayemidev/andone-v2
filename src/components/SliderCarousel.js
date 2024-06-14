import React, { useState, useEffect } from 'react';
import { Carousel, Card, Row, Col, Form, Input, Button, Select, DatePicker, message, Skeleton } from 'antd';
import { db, collection, getDocs } from '../pages/firebase';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { submitQuotation } from '../utils/api';
import '../styles/SliderCarousel.css';
import translateText from '../translationService'; // Import your translation service

const { Option } = Select;
const { TextArea } = Input;

const SliderCarousel = ({ language = 'en' }) => {
  const [loading, setLoading] = useState(true);
  const [carouselItems, setCarouselItems] = useState([]);
  const [inputForm] = Form.useForm();

  const [labels, setLabels] = useState({
    getQuotation: 'Get a Quotation',
    name: 'Name',
    email: 'Email',
    phone: 'Phone Number',
    location: 'Location',
    product: 'Product',
    installation_date: 'Preferred Installation Date',
    message: 'Additional Message',
    submit: 'Get Quote',
    solar_panel: 'Solar Panel',
    battery: 'Battery',
    inverter: 'Inverter',
    accessory: 'Accessory',
  });

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  useEffect(() => {
    translateLabels();
  }, [language]);

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

  const translateLabels = async () => {
    setLoading(true);
    const translatedLabels = {};
    for (const [key, value] of Object.entries(labels)) {
      translatedLabels[key] = await translateText(value, language);
    }
    setLabels(translatedLabels);
    setLoading(false);
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
            <div className="skeleton-carousel">
              <Skeleton.Image active className="skeleton-image" />
              <Skeleton active paragraph={{ rows: 2 }} className="skeleton-text" />
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
            {loading ? (
              <Skeleton active paragraph={{ rows: 10 }} className="skeleton-form" />
            ) : (
              <>
                <h2>{labels.getQuotation}</h2>
                <Form form={inputForm} layout="vertical" onFinish={onFinish} style={{ width: '100%' }}>
                  <Row gutter={10}>
                    <Col xs={24} sm={12}>
                      <Form.Item name="name" label={labels.name} rules={[{ required: true, message: `Please input your ${labels.name.toLowerCase()}!` }]}>
                        <Input prefix={<UserOutlined />} placeholder={`Enter your ${labels.name.toLowerCase()}`} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="email" label={labels.email} rules={[{ required: true, message: `Please input your ${labels.email.toLowerCase()}!` }, { type: 'email', message: `Please enter a valid ${labels.email.toLowerCase()}!` }]}>
                        <Input prefix={<MailOutlined />} type="email" placeholder={`Enter your ${labels.email.toLowerCase()}`} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col xs={24} sm={12}>
                      <Form.Item name="phone" label={labels.phone} rules={[{ required: true, message: `Please input your ${labels.phone.toLowerCase()}!` }]}>
                        <Input prefix={<PhoneOutlined />} placeholder={`Enter your ${labels.phone.toLowerCase()}`} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="location" label={labels.location} rules={[{ required: true, message: `Please input your ${labels.location.toLowerCase()}!` }]}>
                        <Input prefix={<EnvironmentOutlined />} placeholder={labels.location} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col xs={24} sm={12}>
                      <Form.Item name="product" label={labels.product} rules={[{ required: true, message: `Please select a ${labels.product.toLowerCase()}!` }]}>
                        <Select placeholder={`Select a ${labels.product.toLowerCase()}`}>
                          <Option value="solar_panel">{labels.solar_panel}</Option>
                          <Option value="battery">{labels.battery}</Option>
                          <Option value="inverter">{labels.inverter}</Option>
                          <Option value="accessory">{labels.accessory}</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="installation_date" label={labels.installation_date} rules={[{ required: true, message: `Please select a ${labels.installation_date.toLowerCase()}!` }]}>
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col xs={24}>
                      <Form.Item name="message" label={labels.message}>
                        <TextArea rows={2} placeholder={`Enter your ${labels.message.toLowerCase()}`} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit" loading={loading} block>
                    {labels.submit}
                  </Button>
                </Form>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default SliderCarousel;
