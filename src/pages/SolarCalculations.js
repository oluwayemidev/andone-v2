import React, { useState } from 'react';
import axios from 'axios';
import { Layout, Table, Input, Button, Form, Typography, notification, AutoComplete, Popconfirm } from 'antd';
import { PrinterFilled, EditOutlined, DeleteOutlined, UserOutlined, MailOutlined, MessageOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import '../styles/SolarCalculations.css'

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const suggestedItems = [
  'LED Light Bulb',
  'Refrigerator',
  'Air Conditioner',
  'Laptop',
  'Television',
  'Washing Machine',
  'Microwave Oven',
  'Ceiling Fan',
  'Water Heater',
  'Solar Inverter',
];

const SolarCalculationPage = () => {
  const [dataSource, setDataSource] = useState([
    { key: '1', item: 'Demo Item', quantity: 1, watts: 100, hours: 1, wattHour: 100 },
  ]);
  const [count, setCount] = useState(2);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();  // Create form instance for table editing
  const [inputForm] = Form.useForm();  // Create form instance for new item inputs

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      item: '',
      quantity: '',
      watts: '',
      hours: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteRow = (key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
  };

  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      editable: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      editable: true,
    },
    {
      title: 'Watts',
      dataIndex: 'watts',
      key: 'watts',
      editable: true,
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      editable: true,
    },
    {
      title: 'Watt Hour',
      dataIndex: 'wattHour',
      key: 'wattHour',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
              icon={<SaveOutlined />}
            >
            </Button>
            <Button onClick={cancel} icon={<CloseOutlined />}></Button>
          </span>
        ) : (
          <span>
            <Button 
              disabled={editingKey !== ''} 
              onClick={() => edit(record)} 
              icon={<EditOutlined />}
              style={{ marginRight: 8 }}
            >
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key)}>
              <Button 
                disabled={editingKey !== ''} 
                icon={<DeleteOutlined />} 
                danger
              >
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'quantity' || col.dataIndex === 'watts' || col.dataIndex === 'hours' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input type={inputType} />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const onFinish = (values) => {
    // Remove demo item if it exists
    const filteredDataSource = dataSource.filter(item => item.item !== 'Demo Item');

    const newData = {
      key: count.toString(),
      item: values.item,
      quantity: values.quantity,
      watts: values.watts,
      hours: values.hours,
      wattHour: values.quantity * values.watts * values.hours,
    };

    setDataSource([newData, ...filteredDataSource]); // Add new item at the top
    setCount(count + 1);
    inputForm.resetFields(); // Clear form inputs
  };

  const totalWatts = dataSource.reduce((acc, item) => acc + item.watts * item.quantity, 0);
  const totalWattHours = dataSource.reduce((acc, item) => acc + item.wattHour, 0);

  const handleSubmit = async (values) => {
    try {
      // Send the data to the backend
      const response = await axios.post('https://andonesolar.onrender.com/api/solarCalculations', {
        data: { dataSource, ...values },
      });

      // Display a success notification
      notification.success({
        message: 'Submission Successful',
        description: 'The data has been submitted to the admin.',
      });

      // Log the response data
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      notification.error({
        message: 'Submission Failed',
        description: 'There was an error while submitting the data.',
      });
    }
  };

  const handlePrint = () => {
    window.print();
  }

  return (
    <Layout className='calculations-container' style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 50px', textAlign: 'center' }}>
        <Title level={2} style={{ color: 'white', lineHeight: '64px' }}>Solar Calculation</Title>
      </Header>
      <Content className='calculations-content' style={{ padding: '50px' }}>
        <Title level={3}>Solar Power Consumption Calculator</Title>
        <Paragraph>
          Use this calculator to estimate your solar power needs. Add items, their quantities, and power ratings below.
        </Paragraph>
        <Form className='solar-calcualtions-table' form={form} component={false}>
          <Table
            dataSource={dataSource}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}><b>Total</b></Table.Summary.Cell>
                  <Table.Summary.Cell><b>{totalWatts} W</b></Table.Summary.Cell>
                  <Table.Summary.Cell><b>{totalWattHours} Wh</b></Table.Summary.Cell>
                  <Table.Summary.Cell />
                </Table.Summary.Row>
              </Table.Summary>
            )}
            scroll={{ x: 600, y: 240 }}
          />
        </Form>
        
        <Form className='addup-form' form={inputForm} layout="inline" onFinish={onFinish} style={{ marginTop: '20px', gap: '20px' }}>
          <Form.Item name="item" rules={[{ required: true, message: 'Please input the item!' }]}>
            <AutoComplete
              style={{ width: '200px' }}
              options={suggestedItems.map(item => ({ value: item }))}
              placeholder="Item"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
          <Form.Item name="quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
            <Input type="number" placeholder="Quantity" />
          </Form.Item>
          <Form.Item name="watts" rules={[{ required: true, message: 'Please input the watts!' }]}>
            <Input type="number" placeholder="Watts" />
          </Form.Item>
          <Form.Item name="hours" rules={[{ required: true, message: 'Please input the hours!' }]}>
            <Input type="number" placeholder="Hours" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Item</Button>
          </Form.Item>
        </Form>

        <Paragraph style={{ padding: '2rem 0' }}>
          This is just a simple Calculator to help you estimate the solar you
          need. This is not a guarantee that the solar you calculate will be
          perfect for your situation.
        </Paragraph>

        <Paragraph style={{ fontWeight: "bold" }}>
          Print Result: &nbsp;
          <Button onClick={handlePrint}>
            <PrinterFilled />
          </Button>
        </Paragraph>

        <Form className='submit-form' onFinish={handleSubmit} style={{ marginTop: '40px', maxWidth: '500px' }}>
          <Title level={4}>Submit Your Calculation</Title>
          <Form.Item 
            name="name" 
            rules={[{ required: true, message: 'Please input your name!' }]}
            prefix={<UserOutlined />}
          >
            <Input placeholder="Your Name" />
          </Form.Item>
          <Form.Item 
            name="email" 
            rules={[{ required: true, message: 'Please input your email!' }]}
            prefix={<MailOutlined />}
          >
            <Input placeholder="Your Email" />
          </Form.Item>
          <Form.Item 
            name="message"
            prefix={<MessageOutlined />}
          >
            <Input.TextArea rows={4} placeholder="Additional Message" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default SolarCalculationPage;
