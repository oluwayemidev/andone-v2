// src/components/FeaturedProductsWidget.js
import React from 'react';
import { Card, Button, Rate } from 'antd';
import Slider from 'react-slick';
import pic1 from '../images/product1.jpg';
import pic2 from '../images/product2.jpg';
import pic3 from '../images/product3.jpg';
import pic4 from '../images/product4.jpg'; // Added more product images
import pic5 from '../images/product5.jpg';
import pic6 from '../images/product6.jpg';
import '../styles/FeaturedProductsWidget.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturedProductsWidget = () => {
  const data = [
    {
      title: 'High Efficiency Solar Panel',
      description: 'Top-quality solar panel with high efficiency.',
      imgSrc: pic1,
      price: '$199.99',
      rating: 4,
    },
    {
      title: 'Durable Solar Panel',
      description: 'Long-lasting and durable solar panel.',
      imgSrc: pic2,
      price: '$179.99',
      rating: 5,
    },
    {
      title: 'Cost Effective Solar Panel',
      description: 'Affordable solar panel with great performance.',
      imgSrc: pic3,
      price: '$159.99',
      rating: 3.5,
    },
    {
      title: 'Premium Solar Panel',
      description: 'Premium quality solar panel with excellent performance.',
      imgSrc: pic4,
      price: '$219.99',
      rating: 4.5,
    },
    {
      title: 'Budget Solar Panel',
      description: 'Budget-friendly solar panel with decent performance.',
      imgSrc: pic5,
      price: '$139.99',
      rating: 3,
    },
    {
      title: 'Eco Solar Panel',
      description: 'Eco-friendly solar panel with great efficiency.',
      imgSrc: pic6,
      price: '$189.99',
      rating: 4.2,
    },
  ];

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
              <Card.Meta title={item.title} description={item.description} />
              <div className="product-details">
                <div className="price">{item.price}</div>
                <Rate disabled defaultValue={item.rating} />
                <Button type="primary" className="buy-button">Info</Button>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </Card>
  );
};

export default FeaturedProductsWidget;
