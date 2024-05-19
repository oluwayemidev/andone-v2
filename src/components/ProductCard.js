import React from 'react';
import { Card, Button, Typography } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from React Router

const { Title, Text } = Typography;

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={product.image} />}
      actions={[
        <Button type="primary">Add to Cart</Button>,
        <Link to={`/products/${product.id}`}>Details</Link> // Navigate to product details page
      ]}
    >
      <Title level={4}>{product.name}</Title>
      <Text type="secondary">{product.category}</Text>
      <Text strong style={{ display: 'block', marginTop: 8 }}>${product.price}</Text>
    </Card>
  );
};

export default ProductCard;
