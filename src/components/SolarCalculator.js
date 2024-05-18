// src/components/SolarCalculator.js
import React, { useState } from 'react';
import { InputNumber, Button, Form, Input } from 'antd';

const SolarCalculator = () => {
  const [result, setResult] = useState(null);

  const onFinish = values => {
    const { area, efficiency, sunlight } = values;
    const power = area * efficiency * sunlight;
    setResult(power);
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item name="area" label="Panel Area (m²)" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="efficiency" label="Efficiency (%)" rules={[{ required: true }]}>
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item name="sunlight" label="Sunlight Hours (h)" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Calculate</Button>
        </Form.Item>
      </Form>
      {result !== null && <div>Estimated Power Output: {result} kWh</div>}
    </div>
  );
};

export default SolarCalculator;
