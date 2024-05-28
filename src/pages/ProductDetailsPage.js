import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Typography, Spin, Alert, Button, Row, Col } from 'antd';

const { Title, Text } = Typography;

const ProductDetailsPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const history = useNavigate(); // Use history for navigation
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details by ID
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://andonesolar.onrender.com/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert message={error} type="error" />
      </div>
    );
  }

  return (
    <Card style={{ width: '90%', maxWidth: 1200, margin: 'auto', marginTop: '30px', padding: 12 }}>
      <Button type="primary" onClick={() => history(-1)} style={{ marginBottom: 16 }}>
        Back
      </Button>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <img
            alt={product.name}
            src={`https://andonesolar.onrender.com/uploads/${product.image}`}
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Title level={2}>{product.name}</Title>
          <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>{product.category}</Text>
          <Text strong style={{ display: 'block', marginBottom: 16 }}>${product.price}</Text>
          <Text>{product.description}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductDetailsPage;
