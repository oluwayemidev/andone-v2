import React, { useState, useEffect } from "react";
import { Card, Form, InputNumber, Button } from "antd";
import translateText from "../translationService"; // Import your translation service

const SolarEfficiencyWidget = ({ language }) => {
  const [result, setResult] = useState(null);
  const [translatedTexts, setTranslatedTexts] = useState({
    title: "Solar Panel Efficiency Calculator",
    areaLabel: "Panel Area (m²)",
    efficiencyLabel: "Efficiency (%)",
    sunlightLabel: "Sunlight Hours (h)",
    calculateButton: "Calculate",
    estimatedOutputLabel: "Estimated Power Output: ",
    kWhUnit: " kWh",
  });

  useEffect(() => {
    translateStaticTexts(language);
  }, [language]);

  const translateStaticTexts = async (language) => {
    const translatedTitle = await translateText("Solar Panel Efficiency Calculator", language);
    const translatedAreaLabel = await translateText("Panel Area (m²)", language);
    const translatedEfficiencyLabel = await translateText("Efficiency (%)", language);
    const translatedSunlightLabel = await translateText("Sunlight Hours (h)", language);
    const translatedCalculateButton = await translateText("Calculate", language);
    const translatedEstimatedOutputLabel = await translateText("Estimated Power Output: ", language);
    const translatedKWhUnit = await translateText(" kWh", language);

    setTranslatedTexts({
      title: translatedTitle,
      areaLabel: translatedAreaLabel,
      efficiencyLabel: translatedEfficiencyLabel,
      sunlightLabel: translatedSunlightLabel,
      calculateButton: translatedCalculateButton,
      estimatedOutputLabel: translatedEstimatedOutputLabel,
      kWhUnit: translatedKWhUnit,
    });
  };

  const onFinish = (values) => {
    const { area, efficiency, sunlight } = values;
    const power = area * efficiency * sunlight;
    setResult(power);
  };

  return (
    <Card title={translatedTexts.title} bordered={false}>
      <Form onFinish={onFinish}>
        <Form.Item
          name="area"
          label={translatedTexts.areaLabel}
          rules={[{ required: true, message: "Please input the panel area!" }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="efficiency"
          label={translatedTexts.efficiencyLabel}
          rules={[{ required: true, message: "Please input the efficiency!" }]}
        >
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="sunlight"
          label={translatedTexts.sunlightLabel}
          rules={[{ required: true, message: "Please input the sunlight hours!" }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {translatedTexts.calculateButton}
          </Button>
        </Form.Item>
      </Form>
      {result !== null && (
        <div>
          {translatedTexts.estimatedOutputLabel}
          {result}
          {translatedTexts.kWhUnit}
        </div>
      )}
    </Card>
  );
};

export default SolarEfficiencyWidget;
