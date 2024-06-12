import React, { useEffect, useState } from "react";
import { Table, Spin, message, Tag } from "antd";
import { db, collection, getDocs, doc, updateDoc, query, where } from './firebase';
import moment from "moment";

const ContactMessages = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const messages = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        
        // Sort messages by createdAt date in descending order
        const sortedData = messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setData(sortedData);
        setUnreadCount(sortedData.filter(message => message.status === 'unread').length);
      } catch (error) {
        message.error("Failed to fetch messages");
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const handleRowClick = async (record) => {
    if (record.status === 'unread') {
      try {
        await updateDoc(doc(db, "contacts", record.id), { status: 'read' });
        setData(data.map((msg) => (msg.id === record.id ? { ...msg, status: 'read' } : msg)));
        setUnreadCount(unreadCount - 1);
      } catch (error) {
        message.error("Failed to update message status");
      }
    }
  };

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
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 'unread' ? 'red' : 'green'}>
          {status === 'unread' ? 'Unread' : 'Read'}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact Messages</h2>
      <h3>New Unread Messages: {unreadCount}</h3>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              <b>Message: </b> {record.message}
            </p>
          ),
          rowExpandable: (record) => record.message !== null,
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: {
            backgroundColor: record.status === 'unread' ? '#ffd8d8' : 'inherit',
          },
        })}
        scroll={{ x: 600 }}
      />
    </div>
  );
};

export default ContactMessages;
