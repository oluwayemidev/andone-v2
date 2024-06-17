import React, { useState, useEffect } from 'react';
import { Card, Collapse, Skeleton, Alert } from 'antd';
import { db, collection, getDocs } from '../pages/firebase';
import '../styles/FAQsWidget.css';
import translateText from '../translationService'; // Import your translation service

const { Panel } = Collapse;

const FAQsWidget = ({ language }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const faqsCollection = collection(db, 'faqs');
        const faqsSnapshot = await getDocs(faqsCollection);
        const faqsData = faqsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Translate fetched FAQs
        const translatedFaqs = await Promise.all(
          faqsData.map(async (faq) => ({
            ...faq,
            question: await translateText(faq.question, language),
            answer: await translateText(faq.answer, language),
          }))
        );

        setFaqs(translatedFaqs);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setError('Error fetching FAQs: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [language]);

  const loadingArray = Array.from({ length: 8 }, (_, index) => ({ id: index }));

  return (
    <Card title="Frequently Asked Questions" bordered={false} className="faqs-widget">
      {error ? (
        <Alert message="Error" description={error} type="error" />
      ) : (
        <Collapse>
          {(loading ? loadingArray : faqs).map((faq, index) => (
            <Panel header={loading ? <Skeleton active /> : faq.question} key={faq.id || index}>
              <p>{loading ? <Skeleton active paragraph={{ rows: 2 }} /> : faq.answer}</p>
            </Panel>
          ))}
        </Collapse>
      )}
    </Card>
  );
};

export default FAQsWidget;
