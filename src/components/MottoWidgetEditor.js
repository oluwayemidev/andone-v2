import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, List, Space, message } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Slider from 'react-slick';

const { Text } = Typography;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const MottoWidget = ({ mottos }) => (
  <Card bordered={false} className="glass-widget motto-card">
    <Slider {...settings}>
      {mottos.map((item, index) => (
        <div key={index} className="motto-item">
          <div className="motto-item-icon">
            <CheckCircleOutlined style={{ fontSize: 15 }} />
          </div>
          <Text className="motto-item-text">{item.text}</Text>
        </div>
      ))}
    </Slider>
  </Card>
);

const MottoWidgetEditor = () => {
  const [mottos, setMottos] = useState([
    { text: "We Make" },
    { text: "We Create" },
    { text: "AND ONE" },
    { text: "We Guarantee" },
    { text: "We Support" },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.validateFields().then(values => {
      setMottos([...mottos, { text: values.text }]);
      form.resetFields();
      message.success('Motto added successfully');
    });
  };

  const handleEdit = () => {
    form.validateFields().then(values => {
      const updatedMottos = mottos.map((motto, index) => 
        index === editingIndex ? { text: values.text } : motto
      );
      setMottos(updatedMottos);
      setEditingIndex(null);
      form.resetFields();
      message.success('Motto updated successfully');
    });
  };

  const handleDelete = index => {
    const updatedMottos = mottos.filter((_, i) => i !== index);
    setMottos(updatedMottos);
    message.success('Motto deleted successfully');
  };

  const handleEditClick = index => {
    setEditingIndex(index);
    form.setFieldsValue({ text: mottos[index].text });
  };

  return (
    <Card title="Edit Mottos" bordered={false} style={{ width: '100%' }}>
      <Form form={form} layout="inline" onFinish={editingIndex === null ? handleAdd : handleEdit}>
        <Form.Item
          name="text"
          rules={[{ required: true, message: 'Please input a motto!' }]}
        >
          <Input placeholder="Enter motto" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingIndex === null ? 'Add Motto' : 'Update Motto'}
          </Button>
        </Form.Item>
        {editingIndex !== null && (
          <Form.Item>
            <Button onClick={() => { setEditingIndex(null); form.resetFields(); }}>
              Cancel
            </Button>
          </Form.Item>
        )}
      </Form>
      <List
        bordered
        dataSource={mottos}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <EditOutlined onClick={() => handleEditClick(index)} />,
              <DeleteOutlined onClick={() => handleDelete(index)} />
            ]}
          >
            {item.text}
          </List.Item>
        )}
      />
      <MottoWidget mottos={mottos} />
    </Card>
  );
};

export default MottoWidgetEditor;
