import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../pages/firebase";
import { Card, Typography, Spin, Alert, Button, Row, Col, Carousel } from 'antd';
import translateText from "../translationService"; // Import your translation service

const { Title, Text } = Typography;

const ProductDetailsPage = ({ language }) => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Use navigate for navigation
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details by ID
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        const querySnapshot = await getDocs(collection(db, "images"));
        const imagesData = querySnapshot.docs.map(doc => doc.data().url); // Assuming each document has a URL field
        setImages(imagesData);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          const translatedProduct = await translateProductDetails(productData, language);
          setProduct(translatedProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, language]);

  const translateProductDetails = async (product, language) => {
    const translatedName = await translateText(product.name, language);
    const translatedCategory = await translateText(product.category, language);
    const translatedDescription = await translateText(product.description, language);

    return {
      ...product,
      name: translatedName,
      category: translatedCategory,
      description: translatedDescription,
    };
  };

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
      <Button type="primary" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        Back
      </Button>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
        <Carousel>
        {product.imageUrls && product.imageUrls.map((url, index) => (
          <div key={index}>
            <img
              alt={product.name || product.name}
              src={url}
              style={{ height: 200, objectFit: "cover", padding: "10px" }}
            />
          </div>
        ))}
      </Carousel>
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
