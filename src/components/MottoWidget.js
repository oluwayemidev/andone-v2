// src/components/MottoWidget.js
import React from 'react';
import { Card, Typography, Carousel } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import '../styles/MottoWidget.css';
import Slider from 'react-slick';

const { Text } = Typography;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const MottoWidget = () => {
  const motto = [
    { text: "We Make", icon: <CheckCircleOutlined style={{ fontSize: 15 }} /> },
    { text: "We Create", icon: <CheckCircleOutlined style={{ fontSize: 15 }} /> },
    { text: "AND ONE", icon: <CheckCircleOutlined style={{ fontSize: 15 }} /> },
    { text: "We Guarantee", icon: <CheckCircleOutlined style={{ fontSize: 15 }} /> },
    { text: "We Support", icon: <CheckCircleOutlined style={{ fontSize: 15 }} /> },
  ];

  return (
    <Card bordered={false} className="glass-widget motto-card">
      <Slider {...settings}>
        {motto.map((item, index) => (
          <div key={index} className="motto-item">
            <div className="motto-item-icon">{item.icon}</div>
            <Text className="motto-item-text">{item.text}</Text>
          </div>
        ))}
      </Slider>
    </Card>
  );
};

export default MottoWidget;
