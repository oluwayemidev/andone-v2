// src/pages/ContactsPage.js
import React, { useState, useEffect } from "react";
import { Card, Table } from "antd";
import axios from "axios";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axios.get("http://localhost:5000/api/contacts");
    setContacts(response.data);
  };

  return (
    <Card title="Contacts" bordered={false}>
      <Table dataSource={contacts} rowKey="_id">
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Message" dataIndex="message" key="message" />
        <Table.Column title="Timestamp" dataIndex="timestamp" key="timestamp" />
      </Table>
    </Card>
  );
};

export default ContactsPage;
