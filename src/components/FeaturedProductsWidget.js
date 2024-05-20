// src/components/FeaturedProductsWidget.js
import React from 'react';
import { Card, Button, Rate } from 'antd';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import HighEfficiencySolarPanel from '../images/HighEfficiencySolarPanel.png';
import PortableSolarPowerBank from '../images/PortableSolarPowerBank.png';
import SolarPoweredGenerator from '../images/SolarPoweredGenerator.png';
import FlexibleSolarPanel from '../images/FlexibleSolarPanel.jpeg';
import SolarLEDFloodLight from '../images/SolarLEDFloodLight.png';
import Renogy100WSolarPanel from '../images/Renogy100WSolarPanel.jpg';
import EcoFlowDeltaPro from '../images/EcoFlowDeltaPro.jpeg';
import JackeryExplorer1000 from '../images/JackeryExplorer1000.jpeg';
import GoalZeroYeti1500X from '../images/GoalZeroYeti1500X.jpeg';
import BluettiAC200P from '../images/BluettiAC200P.png';
import '../styles/FeaturedProductsWidget.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const data = [
  {
    title: "High Efficiency Solar Panel",
    description: "Top-quality solar panel with high efficiency.",
    imgSrc: HighEfficiencySolarPanel,
    price: "$199",
    rating: 4
  },
  {
    title: "Portable Solar Power Bank",
    description: "Compact and portable solar power bank for charging devices on the go.",
    imgSrc: PortableSolarPowerBank,
    price: "$59",
    rating: 4.5
  },
  {
    title: "Solar Powered Generator",
    description: "Reliable solar-powered generator for backup power and outdoor use.",
    imgSrc: SolarPoweredGenerator,
    price: "$499",
    rating: 4.7
  },
  {
    title: "Flexible Solar Panel",
    description: "Lightweight and flexible solar panel, ideal for uneven surfaces.",
    imgSrc: FlexibleSolarPanel,
    price: "$149",
    rating: 4.3
  },
  {
    title: "Solar LED Flood Light",
    description: "Bright and energy-efficient solar LED flood light for outdoor spaces.",
    imgSrc: SolarLEDFloodLight,
    price: "$39",
    rating: 4.2
  },
  {
    title: "Renogy 100W Solar Panel",
    description: "Highly efficient 100W solar panel suitable for RVs, boats, and off-grid installations.",
    imgSrc: Renogy100WSolarPanel,
    price: "$99",
    rating: 4.8
  },
  {
    title: "EcoFlow Delta Pro",
    description: "Portable power station with expandable capacity, perfect for home backup and off-grid adventures.",
    imgSrc: EcoFlowDeltaPro,
    price: "$2699",
    rating: 4.9
  },
  {
    title: "Jackery Explorer 1000",
    description: "Versatile portable power station with 1000W capacity, ideal for camping and emergency use.",
    imgSrc: JackeryExplorer1000,
    price: "$999",
    rating: 4.6
  },
  {
    title: "Goal Zero Yeti 1500X",
    description: "High-capacity solar generator for powering appliances and electronics during outages and outdoor trips.",
    imgSrc: GoalZeroYeti1500X,
    price: "$1999",
    rating: 4.7
  },
  {
    title: "Bluetti AC200P",
    description: "2000W portable power station with multiple outlets, perfect for home backup and outdoor activities.",
    imgSrc: BluettiAC200P,
    price: "$1599",
    rating: 4.8
  }
];

const FeaturedProductsWidget = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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

  return (
    <Card title="Featured Products" className="featured-products-card">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index}>
            <Card
              hoverable
              cover={<img alt={item.title} src={item.imgSrc} className="product-image" />}
              className="product-card"
            >
              <Card.Meta title={item.title} description={item.description} style={{ height: 80 }} />
              <div className="product-details">
                <div className="price">{item.price}</div>
                <Rate disabled defaultValue={item.rating} />
                <Button type="primary" className="buy-button">
                  <Link to={`/featured-product/${index}`}>Info</Link>
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </Card>
  );
};

export default FeaturedProductsWidget;
