// src/components/ProductInfo.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Rate } from 'antd';
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
import '../styles/FeaturedProductInfo.css'

const products = [
  {
    title: "High Efficiency Solar Panel",
    description: "Top-quality solar panel with high efficiency.",
    fullDescription: "This high-efficiency solar panel is designed for maximum power output and durability. Ideal for residential and commercial applications, it features advanced technology to harness more energy from the sun, even in low-light conditions. The robust construction ensures long-term performance and reliability, making it a top choice for sustainable energy solutions.",
    imgSrc: HighEfficiencySolarPanel,
    price: "$199",
    rating: 4
  },
  {
    title: "Portable Solar Power Bank",
    description: "Compact and portable solar power bank for charging devices on the go.",
    fullDescription: "This portable solar power bank is perfect for outdoor enthusiasts and travelers. It offers a reliable power source for charging your devices while on the go. The compact design makes it easy to carry, and its efficient solar cells ensure quick charging. Whether you’re camping, hiking, or simply need a backup power source, this solar power bank has you covered.",
    imgSrc: PortableSolarPowerBank,
    price: "$59",
    rating: 4.5
  },
  {
    title: "Solar Powered Generator",
    description: "Reliable solar-powered generator for backup power and outdoor use.",
    fullDescription: "This solar-powered generator is an excellent solution for backup power and outdoor activities. It features a high-capacity battery that can power multiple devices simultaneously. With its solar charging capability, you can keep it charged even when away from conventional power sources. Perfect for emergencies, camping trips, and off-grid living.",
    imgSrc: SolarPoweredGenerator,
    price: "$499",
    rating: 4.7
  },
  {
    title: "Flexible Solar Panel",
    description: "Lightweight and flexible solar panel, ideal for uneven surfaces.",
    fullDescription: "This flexible solar panel is designed to fit a variety of surfaces, making it ideal for RVs, boats, and other applications where standard panels won’t work. Its lightweight design ensures easy installation, while the high-efficiency cells provide reliable power generation. Durable and weather-resistant, this panel is built to withstand harsh conditions.",
    imgSrc: FlexibleSolarPanel,
    price: "$149",
    rating: 4.3
  },
  {
    title: "Solar LED Flood Light",
    description: "Bright and energy-efficient solar LED flood light for outdoor spaces.",
    fullDescription: "This solar LED flood light is perfect for illuminating outdoor spaces. It features a bright, energy-efficient LED that provides excellent visibility. The solar panel charges the built-in battery during the day, ensuring the light is ready to use at night. Ideal for gardens, driveways, and security lighting, this flood light offers a sustainable lighting solution.",
    imgSrc: SolarLEDFloodLight,
    price: "$39",
    rating: 4.2
  },
  {
    title: "Renogy 100W Solar Panel",
    description: "Highly efficient 100W solar panel suitable for RVs, boats, and off-grid installations.",
    fullDescription: "The Renogy 100W solar panel is a high-efficiency solution for generating renewable energy. It’s designed for versatility and can be used in various applications, including RVs, boats, and off-grid installations. The panel’s advanced technology ensures maximum power output, even in challenging conditions. Durable and reliable, it’s a great choice for sustainable energy needs.",
    imgSrc: Renogy100WSolarPanel,
    price: "$99",
    rating: 4.8
  },
  {
    title: "EcoFlow Delta Pro",
    description: "Portable power station with expandable capacity, perfect for home backup and off-grid adventures.",
    fullDescription: "The EcoFlow Delta Pro is a powerful and portable power station designed for home backup and off-grid adventures. It offers expandable capacity and multiple charging options, including solar. With its high output and versatile connections, you can power everything from appliances to electronic devices. Durable and easy to transport, it’s the ultimate portable power solution.",
    imgSrc: EcoFlowDeltaPro,
    price: "$2699",
    rating: 4.9
  },
  {
    title: "Jackery Explorer 1000",
    description: "Versatile portable power station with 1000W capacity, ideal for camping and emergency use.",
    fullDescription: "The Jackery Explorer 1000 is a versatile portable power station with a 1000W capacity, making it ideal for camping and emergency use. It features multiple output options to power a wide range of devices and appliances. With its solar charging capability, you can keep it charged in remote locations. Lightweight and easy to carry, it’s a reliable power source for any adventure.",
    imgSrc: JackeryExplorer1000,
    price: "$999",
    rating: 4.6
  },
  {
    title: "Goal Zero Yeti 1500X",
    description: "High-capacity solar generator for powering appliances and electronics during outages and outdoor trips.",
    fullDescription: "The Goal Zero Yeti 1500X is a high-capacity solar generator designed to power appliances and electronics during outages and outdoor trips. It offers a large battery capacity and multiple output options, ensuring you have power when you need it. With its solar charging capability, you can keep it charged without relying on conventional power sources. Durable and reliable, it’s perfect for any off-grid situation.",
    imgSrc: GoalZeroYeti1500X,
    price: "$1999",
    rating: 4.7
  },
  {
    title: "Bluetti AC200P",
    description: "2000W portable power station with multiple outlets, perfect for home backup and outdoor activities.",
    fullDescription: "The Bluetti AC200P is a 2000W portable power station with multiple outlets, making it perfect for home backup and outdoor activities. It offers a large battery capacity and versatile output options, including AC, DC, and USB. With its solar charging capability, you can keep it powered in remote locations. Durable and easy to transport, it’s an excellent choice for reliable portable power.",
    imgSrc: BluettiAC200P,
    price: "$1599",
    rating: 4.8
  }
];

const ProductInfo = () => {
  const { productId } = useParams();
  const history = useNavigate();
  const product = products[productId];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Card title={product.title} className="product-info-card">
      <img alt={product.title} src={product.imgSrc} className="product-info-image" />
      <p>{product.fullDescription}</p>
      <div className="product-info-details">
        <div className="price">{product.price}</div>
        <Rate disabled defaultValue={product.rating} />
      </div>
      <Button type="primary" onClick={() => history(-1)} className="back-button">Back</Button>
    </Card>
  );
};

export default ProductInfo;
