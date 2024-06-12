import React, { useEffect, useState } from "react";
import { Table, Button, Card, Modal, Form, Select, message, Typography } from "antd";
import { db, collection, getDocs, updateDoc, doc } from './firebase';
import moment from "moment";

const { Option } = Select;
const { Paragraph, Text } = Typography;

const QuotationsPage = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "quotations"));
      const quotationsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const sortedQuotations = quotationsList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setQuotations(sortedQuotations);
    } catch (error) {
      message.error("Failed to load quotations");
    }
    setLoading(false);
  };

  const handleUpdateStatus = async (values) => {
    try {
      const quotationDoc = doc(db, "quotations", selectedQuotation.id);
      await updateDoc(quotationDoc, { status: values.status });
      message.success("Status updated successfully");
      setVisible(false);
      fetchQuotations();
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
    },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => {
            setSelectedQuotation(record);
            setVisible(true);
          }}
        >
          Update Status
        </Button>
      ),
    },
  ];

  return (
    <Card title="Quotations" bordered={false}>
      <Table
        dataSource={quotations}
        columns={columns}
        rowKey="id"
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <Paragraph>
                <Text strong>Message:</Text> {record.message}
              </Paragraph>
              <Paragraph>
                <Text strong>Product:</Text> {record.product}
              </Paragraph>
              <Paragraph>
                <Text strong>Installation Date:</Text>{" "}
                {moment(record.installation_date.toDate()).format("YYYY-MM-DD")}
              </Paragraph>
              <Paragraph>
                <Text strong>Location:</Text> {record.location}
              </Paragraph>
            </div>
          ),
        }}
      />
      <Modal
        title="Update Status"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form onFinish={handleUpdateStatus}>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default QuotationsPage;
