// CalculatorWidget.js
import React from 'react';
import { Card, Input, Button } from 'antd';

const CalculatorWidget = () => {
  return (
    <Card title="Solar Calculator">
      {/* Calculator form */}
      <Input placeholder="Enter your location" style={{ marginBottom: '10px' }} />
      <Input placeholder="Enter your roof size" style={{ marginBottom: '10px' }} />
      <Button type="primary">Calculate</Button>
    </Card>
  );
};

export default CalculatorWidget;
