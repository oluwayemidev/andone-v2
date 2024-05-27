import React, { useEffect, useState } from "react";
import { Table, Spin, message } from "antd";
import axios from "axios";

const ContactMessages = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://andonesolar.onrender.com/api/contacts"
        );
        // Sort messages by createdAt date in descending order
        const sortedData = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setData(sortedData);
      } catch (error) {
        message.error("Failed to fetch messages");
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact Messages</h2>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              <b>Message: </b> {record.message}
            </p>
          ),
          rowExpandable: (record) => record.message !== null,
        }}
        scroll={{ x: 600 }}
      />
    </div>
  );
};

export default ContactMessages;
