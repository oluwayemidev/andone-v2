import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Card,
  Layout,
  Typography,
  Skeleton,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  MessageOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { submitQuotation } from "../utils/api";
import "../styles/QuotationForm.css";
import translateText from "../translationService"; // Import your translation service

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const QuotationForm = ({ language = 'en' }) => { // Provide a default value for language
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [form] = Form.useForm();

  const [labels, setLabels] = useState({
    name: "Name",
    email: "Email address",
    phone: "Phone Number",
    location: "Location",
    product: "Product",
    installation_date: "Preferred Installation Date",
    message: "Additional Message",
    submit: "Submit",
    title: "Request a Quotation",
    header: "Quotation",
    solar_panel: "Solar Panel",
    battery: "Battery",
    inverter: "Inverter",
    accessory: "Accessory",
  });

  const translateLabels = async () => {
    const translatedLabels = {};
    for (const [key, value] of Object.entries(labels)) {
      translatedLabels[key] = await translateText(value, language);
    }
    setLabels(translatedLabels);
    setLoading(false); // Set loading to false after translations are fetched
  };

  useEffect(() => {
    setLoading(true); // Set loading to true whenever language changes
    if (language) {
      translateLabels();
    } else {
      setLoading(false);
    }
  }, [language]);

  const onFinish = async (values) => {
    form.resetFields();
    setFormLoading(true);

    // Convert moment object to JavaScript Date object
    const formattedValues = {
      ...values,
      installation_date: values.installation_date.toDate(),
    };

    await submitQuotation(formattedValues);
    setFormLoading(false);
  };

  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <Title
            level={2}
            style={{ color: "white", lineHeight: "64px", textAlign: "center" }}
          >
            <Skeleton.Input active size="small" />
          </Title>
        </Header>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          <Card className="quotation-form-card">
            <Skeleton active paragraph={{ rows: 10 }} />
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <Title
          level={2}
          style={{ color: "white", lineHeight: "64px", textAlign: "center" }}
        >
          {labels.header}
        </Title>
      </Header>
      <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
        <Card title={labels.title} className="quotation-form-card">
          <Form
            form={form}
            name="quotation_form"
            layout="vertical"
            onFinish={onFinish}
            className="quotation-form"
          >
            <Form.Item
              name="name"
              label={labels.name}
              rules={[
                {
                  required: true,
                  message: `Please input your ${labels.name.toLowerCase()}!`,
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={`Enter your ${labels.name.toLowerCase()}`}
                style={{ background: "transparent" }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={labels.email}
              rules={[
                {
                  required: true,
                  message: `Please input your ${labels.email.toLowerCase()}!`,
                },
                {
                  type: "email",
                  message: `Please enter a valid ${labels.email.toLowerCase()}!`,
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                type="email"
                placeholder={`Enter your ${labels.email.toLowerCase()}`}
                style={{ background: "transparent" }}
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label={labels.phone}
              rules={[
                {
                  required: true,
                  message: `Please input your ${labels.phone.toLowerCase()}!`,
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder={`Enter your ${labels.phone.toLowerCase()}`}
                style={{ background: "transparent" }}
              />
            </Form.Item>
            <Form.Item
              name="location"
              label={labels.location}
              rules={[
                {
                  required: true,
                  message: `Please input your ${labels.location.toLowerCase()}!`,
                },
              ]}
            >
              <Input
                prefix={<EnvironmentOutlined />}
                placeholder={labels.location}
                style={{ background: "transparent" }}
              />
            </Form.Item>
            <Form.Item
              name="product"
              label={labels.product}
              rules={[
                {
                  required: true,
                  message: `Please select a ${labels.product.toLowerCase()}!`,
                },
              ]}
            >
              <Select
                placeholder={`Select a ${labels.product.toLowerCase()}`}
                style={{ background: "transparent" }}
              >
                <Option value="solar_panel">{labels.solar_panel}</Option>
                <Option value="battery">{labels.battery}</Option>
                <Option value="inverter">{labels.inverter}</Option>
                <Option value="accessory">{labels.accessory}</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="installation_date"
              label={labels.installation_date}
              rules={[
                {
                  required: true,
                  message: `Please select a ${labels.installation_date.toLowerCase()}!`,
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%", background: "transparent" }}
                prefix={<CalendarOutlined />}
              />
            </Form.Item>
            <Form.Item name="message" label={labels.message}>
              <TextArea
                rows={4}
                placeholder={`Enter your ${labels.message.toLowerCase()}`}
                style={{ background: "transparent" }}
                prefix={<MessageOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={formLoading}>
                {labels.submit}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default QuotationForm;
