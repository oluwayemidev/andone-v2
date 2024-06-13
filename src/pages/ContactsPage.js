import React, { useEffect, useState } from "react";
import { Table, Spin, message, Tag, Button, Popconfirm, Modal, Form, Input, Space } from "antd";
import { db, collection, getDocs, doc, updateDoc, deleteDoc, query, where } from './firebase';
import moment from "moment";

const ContactMessages = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyRecord, setReplyRecord] = useState(null);

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

  const handleDelete = async (record) => {
    try {
      await deleteDoc(doc(db, "contacts", record.id));
      setData(data.filter(msg => msg.id !== record.id));
      message.success("Message deleted successfully");
    } catch (error) {
      message.error("Failed to delete message");
    }
  };

  const handleReply = (record) => {
    setReplyRecord(record);
    setVisible(true);
  };

  const handleReplySubmit = async () => {
    try {
      // Perform action for replying to the message
      // For demonstration, we'll just update the status to 'replied'
      await updateDoc(doc(db, "contacts", replyRecord.id), { status: 'replied' });
      setUnreadCount(unreadCount - 1); // Assuming a reply marks the message as read
      message.success("Message replied successfully");
      setVisible(false);
    } catch (error) {
      message.error("Failed to reply to message");
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
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleReply(record)}>Reply</Button>
          <Popconfirm
            title="Are you sure to delete this message?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" danger>Delete</Button>
          </Popconfirm>
        </Space>
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
        scroll={{ x: 600 }}
      />
      <Modal
        title="Reply to Message"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleReplySubmit}
      >
        <Form>
          <Form.Item label="Reply Message">
            <Input.TextArea 
              rows={4} 
              value={replyMessage} 
              onChange={(e) => setReplyMessage(e.target.value)} 
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactMessages;
