// src/components/FAQsWidget.js
import React from 'react';
import { Card, Collapse } from 'antd';

const { Panel } = Collapse;

const FAQsWidget = () => {
  const faqs = [
    {
      question: 'What are the benefits of using solar energy?',
      answer: 'Solar energy provides numerous benefits including reducing electricity bills, decreasing carbon footprint, increasing property value, and offering a renewable and sustainable source of power.',
    },
    {
      question: 'How do solar panels work?',
      answer: 'Solar panels convert sunlight into electricity using photovoltaic cells. These cells generate direct current (DC) electricity, which is then converted to alternating current (AC) electricity by an inverter for use in homes and businesses.',
    },
    {
      question: 'What is the lifespan of a solar panel?',
      answer: 'The average lifespan of a solar panel is about 25-30 years. Most solar panels come with a warranty of 25 years, ensuring they will perform efficiently for decades.',
    },
    {
      question: 'Do solar panels require maintenance?',
      answer: 'Solar panels require minimal maintenance. Regular cleaning to remove dust and debris and periodic inspections to ensure all components are functioning properly are usually sufficient.',
    },
    {
      question: 'Can I install solar panels myself?',
      answer: 'While some homeowners may choose to install solar panels themselves, it is generally recommended to hire a professional installer to ensure the system is set up correctly and safely.',
    },
    {
      question: 'How much does a solar panel system cost?',
      answer: 'The cost of a solar panel system varies based on the size of the system, the type of panels used, and the installation costs. On average, residential solar panel systems can range from $10,000 to $30,000 before tax incentives and rebates.',
    },
    {
      question: 'Are there any government incentives for installing solar panels?',
      answer: 'Yes, many governments offer incentives such as tax credits, rebates, and grants to encourage the adoption of solar energy. These incentives can significantly reduce the initial cost of installing a solar panel system.',
    },
    {
      question: 'What happens if my solar panels produce more electricity than I use?',
      answer: 'If your solar panels produce more electricity than you use, the excess energy can often be fed back into the grid. Many utility companies offer net metering, which credits you for the surplus energy you generate, reducing your overall electricity bill.',
    },
  ];

  return (
    <Card title="Frequently Asked Questions" bordered={false} className="faqs-widget">
      <Collapse>
        {faqs.map((faq, index) => (
          <Panel header={faq.question} key={index}>
            <p>{faq.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </Card>
  );
};

export default FAQsWidget;
