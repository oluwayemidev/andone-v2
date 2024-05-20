import React, { useEffect, useState } from "react";
import { Card, Button, Typography } from "antd";
import { Link } from "react-router-dom"; // Import Link from React Router
import axios from "axios";

const { Title, Text } = Typography;

const ProductCard = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded images from the server
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/uploads"); // Replace with your endpoint
        setImages(response.data); // Assuming the response data is an array of image URLs
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
          src={`http://localhost:5000/uploads/${product.image}`}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
      actions={[
        <Button type="primary" disabled>
          Add to Cart
        </Button>,
        <Link to={`/products/${product._id}`}>
          <Button type="default">Details</Button>
        </Link>, // Navigate to product details page
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
