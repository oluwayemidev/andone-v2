// src/components/AdvantagesWidget.js
import React from 'react';
import { Card, Row, Col } from 'antd';
import reliablePerformance from "../images/reliablePerformance.png";
import costEffectiveSolutions from "../images/costEffectiveSolutions.png";
import exceptionalQuality from "../images/exceptionalQuality.jpg";
import expertSupport from "../images/expertSupport.jpg";
import environmentalSustainability from "../images/environmentalSustainability.png";
import innovativeTechnology from "../images/innovativeTechnology.jpg";
import '../styles/AdvantagesWidget.css';

const advantages = [
  {
    title: "Reliable Performance",
    description: "Engineered for reliability, AndOne products ensure consistent performance in challenging conditions.",
    img: reliablePerformance,
  },
  {
    title: "Cost-effective Solutions",
    description: "Our efficient panels maximize energy production and minimize costs, offering great value.",
    img: costEffectiveSolutions,
  },
  {
    title: "Exceptional Quality",
    description: "We prioritize exceptional quality using premium materials and cutting-edge technology.",
    img: exceptionalQuality,
  },
  {
    title: "Expert Support",
    description: "Our team provides guidance from consultation to installation and ongoing maintenance.",
    img: expertSupport,
  },
  {
    title: "Environmental Sustainability",
    description: "Our products reduce reliance on fossil fuels, minimizing carbon emissions for a greener future.",
    img: environmentalSustainability,
  },
  {
    title: "Innovative Technology",
    description: "We incorporate innovative technology to optimize energy production and efficiency.",
    img: innovativeTechnology,
  },
];


const AdvantagesWidget = () => {
    return (
      <Card title="Our Values" bordered={false} style={{ width: "100%" }} className="advantages-container">
        <Row gutter={[16, 16]}>
          {advantages.map((advantage, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                cover={<img alt={advantage.title} src={advantage.img} className="advantage-image" />}
                className="advantage-card"
              >
                <Card.Meta title={advantage.title} description={advantage.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    );
  };
  
  export default AdvantagesWidget;
  