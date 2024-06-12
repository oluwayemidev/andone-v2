// src/components/TestimonialsWidget.js
import React, { useState, useEffect } from 'react';
import { Card, List, Skeleton } from 'antd';
import { db, collection, getDocs } from '../pages/firebase';

const TestimonialsWidget = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsCollection = collection(db, 'testimonials');
        const testimonialsSnapshot = await getDocs(testimonialsCollection);
        const testimonialsData = testimonialsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const loadingArray = Array.from({ length: 4 }, (_, index) => ({ id: index }));

  return (
    <Card title="Customer Testimonials" bordered={false} style={{ width: 300 }}>
      <List
        itemLayout="horizontal"
        dataSource={loading ? loadingArray : testimonials}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={loading ? <Skeleton.Input style={{ width: 100 }} active /> : item.name}
              description={loading ? <Skeleton paragraph={{ rows: 1 }} active /> : item.text}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TestimonialsWidget;
