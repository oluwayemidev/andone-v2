// src/components/FAQsWidget.js
import React, { useState, useEffect } from 'react';
import { Card, Collapse, Skeleton } from 'antd';
import { db, collection, getDocs } from '../pages/firebase';
import '../styles/FAQsWidget.css';

const { Panel } = Collapse;

const FAQsWidget = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const faqsCollection = collection(db, 'faqs');
        const faqsSnapshot = await getDocs(faqsCollection);
        const faqsData = faqsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFaqs(faqsData);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const loadingArray = Array.from({ length: 8 }, (_, index) => ({ id: index }));

  return (
    <Card title="Frequently Asked Questions" bordered={false} className="faqs-widget">
      <Collapse>
        {(loading ? loadingArray : faqs).map((faq, index) => (
          <Panel header={loading ? <Skeleton active /> : faq.question} key={faq.id || index}>
            <p>{loading ? <Skeleton active paragraph={{ rows: 2 }} /> : faq.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </Card>
  );
};

export default FAQsWidget;
