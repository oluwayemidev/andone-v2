// CustomerReviewsWidget.js
import React from 'react';
import { Card, Rate } from 'antd';

const CustomerReviewsWidget = () => {
  return (
    <Card title="Customer Reviews">
      {/* Customer reviews or testimonials */}
      <div>
        <p>Great product! Highly recommended.</p>
        <Rate disabled defaultValue={5} />
      </div>
    </Card>
  );
};

export default CustomerReviewsWidget;
