// src/components/ProductCard.js
import React from 'react';
import { Card, Button, Typography } from 'antd';

const { Title, Text } = Typography;

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={product.image} />}
      actions={[
        <Button type="primary">Add to Cart</Button>,
        <Button type="default">Details</Button>
      ]}
    >
      <Title level={4}>{product.name}</Title>
      <Text type="secondary">{product.category}</Text>
      <Text strong style={{ display: 'block', marginTop: 8 }}>${product.price}</Text>
    </Card>
  );
};

export default ProductCard;
