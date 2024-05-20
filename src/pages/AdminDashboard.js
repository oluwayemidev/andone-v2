// src/components/AdminDashboard.js
import React, { useState } from "react";
import { Layout, Menu, Badge } from "antd";
import { Outlet, Link } from "react-router-dom";
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
} from "@ant-design/icons";
import "../styles/AdminDashboard.css";

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

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
        <div className="logo" />
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
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/admin/chat">Users</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<MessageOutlined />}>
            <Link to="/admin/messages">Messages</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<ContactsOutlined />}>
            <Link to="/admin/contacts">Contacts</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<FileTextOutlined />}>
            <Link to="/admin/quotations">Quotations</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<BulbOutlined />}>
            <Link to="/admin/solar-results">Solar Results</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<FormOutlined />}>
            <Link to="/quotation">Request Quotation</Link>
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
