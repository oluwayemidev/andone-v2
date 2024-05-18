// src/pages/UsersPage.js
import React, { useState, useEffect } from "react";
import { Card, Table } from "antd";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/users");
    setUsers(response.data);
  };

  return (
    <Card title="Users" bordered={false}>
      <Table dataSource={users} rowKey="_id">
        <Table.Column title="Username" dataIndex="username" key="username" />
        <Table.Column title="Role" dataIndex="role" key="role" />
      </Table>
    </Card>
  );
};

export default UsersPage;
