// NewsletterSignupWidget.js
import React from 'react';
import { Card, Input, Button } from 'antd';

const NewsletterSignupWidget = () => {
  return (
    <Card title="Newsletter Signup">
      {/* Newsletter signup form */}
      <Input placeholder="Enter your email" style={{ marginBottom: '10px' }} />
      <Button type="primary">Subscribe</Button>
    </Card>
  );
};

export default NewsletterSignupWidget;
