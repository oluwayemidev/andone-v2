// src/components/FeaturedProductsWidget.js
import React, { useState, useEffect } from "react";
import { Card, Button, Rate, message, Skeleton } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { db, collection, getDocs } from "../pages/firebase";
import "../styles/FeaturedProductsWidget.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedProductsWidget = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "featuredProducts"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

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
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Card className="product-card">
                  <Skeleton.Image active className="product-image-skeleton" />
                  <Skeleton active title={false} paragraph={{ rows: 3 }} style={{ marginTop: '30px' }} />
                </Card>
              </div>
            ))
          : products.map((item, index) => (
              <div key={item.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={item.title}
                      src={item.imgSrc}
                      className="product-image"
                    />
                  }
                  className="product-card"
                >
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                    style={{ height: 80 }}
                  />
                  <div className="product-details">
                    <div className="price">${item.price}</div>
                    <Rate disabled defaultValue={item.rating} />

                    <Link to={`/featured-product/${item.id}`}>
                      <Button type="default" className="buy-button">
                        Info
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
      </Slider>
    </Card>
  );
};

export default FeaturedProductsWidget;
