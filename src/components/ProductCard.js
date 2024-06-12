import React, { useEffect, useState } from "react";
import { Card, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../pages/firebase"; // Import Firestore instance from firebase.js
import "../styles/ProductCard.css"; // Ensure you have the necessary CSS for styling

const { Title, Text } = Typography;

const ProductCard = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "images"));
        const imagesData = querySnapshot.docs.map(doc => doc.data().url); // Assuming each document has a URL field
        setImages(imagesData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.imageUrl} // Ensure the product image URL is directly used
          style={{ height: 200, objectFit: "cover" }}
        />
      }
      actions={[
        <Button type="primary" disabled>
          Add to Cart
        </Button>,
        <Link to={`/products/${product.id}`}>
          <Button type="default">Details</Button>
        </Link>,
      ]}
    >
      <Title level={4}>{product.name}</Title>
      <Text type="secondary">{product.category}</Text>
      <Text strong style={{ display: "block", marginTop: 8 }}>
        ${product.price}
      </Text>
    </Card>
  );
};

export default ProductCard;
