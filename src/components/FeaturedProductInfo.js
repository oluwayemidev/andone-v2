// src/components/ProductInfo.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Rate, message, Spin } from 'antd';
import { db, doc, getDoc } from '../pages/firebase';
import '../styles/FeaturedProductInfo.css';

const ProductInfo = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'featuredProducts', productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          setError('Product not found');
        }
      } catch (error) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <Button type="primary" onClick={() => navigate(-1)} className="back-button">
          Back
        </Button>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div style={{ width: 'fit-content', margin: 'auto' }}>
      <Card title={product.title} className="product-info-card">
        <img alt={product.title} src={product.imgSrc} className="product-info-image" />
        <p className="product-info-description">{product.description}</p>
        <div className="product-info-details">
          <div className="product-info-price">${product.price}</div>
          <Rate disabled defaultValue={product.rating} />
        </div>
        <Button type="primary" onClick={() => navigate(-1)} className="back-button">
          Back
        </Button>
      </Card>
    </div>
  );
};

export default ProductInfo;
