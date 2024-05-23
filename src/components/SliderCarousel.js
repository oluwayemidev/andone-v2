import React, { useState } from "react";
import {
  Carousel,
  Card,
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  notification,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  MessageOutlined,
  EnvironmentOutlined
} from "@ant-design/icons"; // Import Ant Design icons
import pic1 from "../images/pic1.jpg";
import pic2 from "../images/pic2.jpg";
import pic3 from "../images/pic3.jpg";
import pic4 from "../images/pic4.jpg";
import axios from "axios";
import "../styles/SliderCarousel.css";

const { Option } = Select;
const { TextArea } = Input;

const carouselItems = [
  {
    imgSrc: pic1,
    altText: "Energy Solutions",
    caption: "High Efficiency Solar Panel",
  },
  {
    imgSrc: pic2,
    altText: "Solar Energy",
    caption: "Durable Solar Products",
  },
  {
    imgSrc: pic3,
    altText: "Experience Clean Energy Solutions",
    caption: "Focuses on empowering communities.",
  },
  {
    imgSrc: pic4,
    altText: "AndOne",
    caption: "Leading the Way in Solar Technology",
  },
];

const SliderCarousel = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/quotations", values);
      notification.success({
        message: "Success",
        description: "Quotation request submitted successfully!",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to submit quotation request. Please try again.",
      });
    }
    setLoading(false)
  };

  return (
    <Card title="" bordered={false} className="carousel-card">
      <Row gutter={16}>
        <Col xs={24} md={24}>
          <Carousel autoplay effect="fade" className="overlay">
            {carouselItems.map((item, index) => (
              <div key={index} className="carousel-slide">
                <img
                  src={item.imgSrc}
                  alt={item.altText}
                  className="carousel-image"
                />
                <div className="carousel-caption">
                  <h3>{item.caption}</h3>
                </div>
              </div>
            ))}
          </Carousel>
        </Col>
        <Col className="cta-container" xs={24} md={10}>
          <div className="cta-form-container">
            <h2>Get a Quotation</h2>
            <Form
              layout="vertical"
              onFinish={onFinish}
              style={{ width: "100%" }}
            >
              <Row gutter={10}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter your name"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Enter your phone number"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="location"
                    label="Location"
                    rules={[
                      {
                        required: true,
                        message: "Please input your location!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<EnvironmentOutlined />}
                      placeholder="Location"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                
              <Col xs={24} sm={12}>
                  <Form.Item
                    name="product"
                    label="Product"
                    rules={[
                      { required: true, message: "Please select a product!" },
                    ]}
                  >
                    <Select
                      placeholder="Select a product"
                      prefix={<CalendarOutlined />}
                    >
                      <Option value="solar_panel">Solar Panel</Option>
                      <Option value="battery">Battery</Option>
                      <Option value="inverter">Inverter</Option>
                      <Option value="accessory">Accessory</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="installation_date"
                    label="Preferred Installation Date"
                    rules={[
                      { required: true, message: "Please select a date!" },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      prefix={<CalendarOutlined />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="message" label="Additional Message">
                    <TextArea
                      rows={4}
                      placeholder="Enter your message"
                      prefix={<MessageOutlined />}
                    />
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
