// src/components/SliderCarousel.js
import React from "react";
import { Carousel, Card, Button, Form, Input, Row, Col } from "antd";
import pic1 from "../images/pic1.jpg";
import pic2 from "../images/pic2.jpg";
import pic3 from "../images/pic3.jpg";
import pic4 from "../images/pic4.jpg";
import "../styles/SliderCarousel.css";

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
    caption: "Focuses on empowering communities through democratizing access to clean energy, aiming to illuminate lives and promote sustainability.",
  },
  {
    imgSrc: pic4,
    altText: "AndOne",
    caption: "Leading the Way in Solar Technology",
  },
];

const SliderCarousel = () => (
  <Card title="" bordered={false} className="carousel-card">
    <Row gutter={[[16, 16]]}>
      <Col xs={24} md={24}>
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
      </Col>
      <Col className="cta-container" xs={24} md={8}>
        <div className="cta-form-container">
          <h2>Get a Quotation</h2>
          <Form layout="vertical" style={{ width: '100%' }}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input placeholder="Enter your address" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Get Quote
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  </Card>
);

export default SliderCarousel;
