import React, { useState, useEffect } from "react";
import { Card, Button, Rate, message, Skeleton, Grid } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { db, collection, getDocs } from "../pages/firebase";
import "../styles/FeaturedProductsWidget.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import translateText from "../translationService";

const { useBreakpoint } = Grid;

const FeaturedProductsWidget = ({ language }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [translatedTexts, setTranslatedTexts] = useState({});
  const screens = useBreakpoint();

  const textsToTranslate = {
    featuredProducts: "Featured Products",
    info: "Info",
  };

  useEffect(() => {
    fetchProducts();
  }, [language]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "featuredProducts"));
      const productsList = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            title: await translateText(data.title, language),
            description: await translateText(data.description, language),
          };
        })
      );
      setProducts(productsList);
    } catch (error) {
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const translateAllTexts = async () => {
      setLoading(true); // Start loader
      const translations = {};

      for (const key in textsToTranslate) {
        translations[key] = await translateText(
          textsToTranslate[key],
          language
        );
      }

      setTranslatedTexts(translations);
      setLoading(false); // Stop loader
    };

    translateAllTexts();
  }, [language]);

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

  return (
    <Card
      title={
        translatedTexts.featuredProducts || textsToTranslate.featuredProducts
      }
      className="featured-products-card"
    >
      <Slider {...settings}>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Card className="product-card">
                  <Skeleton.Image active className="product-image-skeleton" />
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 3 }}
                    style={{ marginTop: "30px" }}
                  />
                </Card>
              </div>
            ))
          : products.map((item) => (
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
                    <Rate
                      disabled
                      defaultValue={item.rating}
                      className={screens.md ? "rate-md" : "rate-sm"}
                    />
                    <Link to={`/featured-product/${item.id}`}>
                      <Button type="default" className="buy-button">
                        {translatedTexts.info || textsToTranslate.info}
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
