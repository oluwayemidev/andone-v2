// src/components/TestimonialsWidget.js
import React from 'react';
import { Card, List } from 'antd';

const testimonials = [
  { name: 'Michael Johnson', text: 'Highly recommend AndOne solar products for their quality and efficiency.' },
  { name: 'Emily Davis', text: 'Excellent customer support and reliable solar panels.' },
  { name: 'David Wilson', text: 'The best investment we made for our home. Loving the savings on our electricity bill.' },
  { name: 'Sarah Brown', text: 'The installation was smooth and the team was very professional.' },
];


const TestimonialsWidget = () => (
  <Card title="Customer Testimonials" bordered={false} style={{ width: 300 }}>
    <List
      itemLayout="horizontal"
      dataSource={testimonials}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={item.name}
            description={item.text}
          />
        </List.Item>
      )}
    />
  </Card>
);

export default TestimonialsWidget;
