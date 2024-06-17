import React, { useState, useEffect } from 'react';
import { Card, List, Skeleton, Alert } from 'antd';
import { db, collection, getDocs } from '../pages/firebase';
import translateText from '../translationService'; // Import your translation service

const TestimonialsWidget = ({ language }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsCollection = collection(db, 'testimonials');
        const testimonialsSnapshot = await getDocs(testimonialsCollection);
        const testimonialsData = testimonialsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Translate fetched testimonials
        const translatedTestimonials = await Promise.all(
          testimonialsData.map(async (testimonial) => ({
            ...testimonial,
            name: await translateText(testimonial.name, language),
            text: await translateText(testimonial.text, language),
          }))
        );

        setTestimonials(translatedTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError('Error fetching testimonials: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [language]);

  const loadingArray = Array.from({ length: 4 }, (_, index) => ({ id: index }));

  return (
    <Card title="Customer Testimonials" bordered={false} style={{ width: 300 }}>
      {error ? (
        <Alert message="Error" description={error} type="error" />
      ) : (
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
      )}
    </Card>
  );
};

export default TestimonialsWidget;
