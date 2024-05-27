// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { Layout, Menu, Badge } from "antd";
import axios from "axios";
import { Outlet, Link, Navigate } from "react-router-dom";
import {
  BulbOutlined,
  ContainerOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  UserOutlined,
  MessageOutlined,
  ContactsOutlined,
  FileTextOutlined,
  FormOutlined,
  DashboardOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../styles/AdminDashboard.css";

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get(
            "https://andonesolar.onrender.com/api/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(data);
        } catch (error) {
          console.error(error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };
    fetchUser();
  }, []);

  if (user === null) {
    // You might want to show a loading indicator while fetching the user
    <Navigate to="/pagenotfound" replace />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
        breakpoint="lg"
        collapsedWidth="80"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          paddingTop: 20,
          zIndex: 1,
          left: 0,
          top: 60,
          bottom: 0,
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/admin/">Overview</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to="/admin/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to="/admin/categories">Categories</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<MessageOutlined />}>
            <Link to="/admin/chat">Messages</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ContactsOutlined />}>
            <Link to="/admin/contacts">Contacts</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<FileTextOutlined />}>
            <Link to="/admin/quotations">Quotations</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<BulbOutlined />}>
            <Link to="/admin/solar-results">Solar Results</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<FormOutlined />}>
            <Link to="/quotation">Request Quotation</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<LogoutOutlined />}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="trigger" onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div style={{ float: "right", paddingRight: 24, marginTop: -50 }}>
            <Badge count={5}>
              <BellOutlined style={{ fontSize: 24 }} />
            </Badge>
          </div>
        </Header>
        <Content style={{ margin: "0 16px", overflow: "initial" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
