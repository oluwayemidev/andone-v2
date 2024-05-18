// src/components/SolarEfficiencyWidget.js
import React, { useState } from "react";
import { Card, Form, InputNumber, Button } from "antd";

const SolarEfficiencyWidget = () => {
  const [result, setResult] = useState(null);

  const onFinish = (values) => {
    const { area, efficiency, sunlight } = values;
    const power = area * efficiency * sunlight;
    setResult(power);
  };

  return (
    <Card title="Solar Panel Efficiency Calculator" bordered={false}>
      <Form onFinish={onFinish}>
        <Form.Item
          name="area"
          label="Panel Area (m²)"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="efficiency"
          label="Efficiency (%)"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="sunlight"
          label="Sunlight Hours (h)"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Calculate
          </Button>
        </Form.Item>
      </Form>
      {result !== null && <div>Estimated Power Output: {result} kWh</div>}
    </Card>
  );
};

export default SolarEfficiencyWidget;
