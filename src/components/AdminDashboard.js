// src/components/AdminDashboard.js
import React, { useContext, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Badge,
  Dropdown,
  message,
  Typography,
  Row,
  Col,
  Avatar,
} from "antd";
import { Outlet, Link } from "react-router-dom";
import {
  BulbOutlined,
  ContainerOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  ContactsOutlined,
  FileTextOutlined,
  DashboardOutlined,
  BellOutlined,
  MessageOutlined,
  LogoutOutlined,
  SettingOutlined,
  FileMarkdownOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { MessagesContext } from "../context/MessagesContext";
import {
  db,
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "../pages/firebase";
import "../styles/AdminDashboard.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const messages = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Sort messages by createdAt date in descending order
        const sortedData = messages.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setUnreadCount(
          sortedData.filter((message) => message.status === "unread").length
        );
        setUnreadMessages(
          sortedData.filter((message) => message.status === "unread")
        );
      } catch (error) {
        message.error("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const messageMenu = (
    <Menu>
      {unreadMessages.map((message, index) => (
        <Menu.Item key={index}>
          <Link to={`/admin/contacts`}>
            <Row gutter={10}>
              <Col style={{ paddingTop: '6px' }}>
                <Avatar>{message.name.slice(0,1).toUpperCase()}</Avatar>
              </Col>
              <Col>
                <Typography type="primary">{message.name}</Typography>
                <Typography type="secondary">{message.email}</Typography>
              </Col>
            </Row>
          </Link>
        </Menu.Item>
      ))}
      {unreadMessages.length === 0 && <Menu.Item>No new messages</Menu.Item>}
    </Menu>
  );

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
          <Menu.Item key="4" icon={<ContactsOutlined />}>
            <Link to="/admin/contacts">Contacts</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FileTextOutlined />}>
            <Link to="/admin/quotations">Quotations</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<BulbOutlined />}>
            <Link to="/admin/solar-results">Solar Results</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<SettingOutlined />} title="Customization">
            <Menu.Item key="7" icon={<FileMarkdownOutlined />}>
              <Link to="/admin/pages">Pages</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<ToolOutlined />}>
              <Link to="/admin/widgets">Widgets</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<SettingOutlined />}>
              <Link to="/admin/settings">Settings</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="10"
            onClick={logout}
            icon={<LogoutOutlined />}
            style={{ marginBottom: "120px" }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="trigger" onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div style={{ float: "right", paddingRight: 24, marginTop: -50 }}>
            <Dropdown overlay={messageMenu} trigger={["click"]}>
              <Badge count={unreadCount} style={{ cursor: "pointer" }}>
                <MessageOutlined style={{ fontSize: 24, cursor: "pointer" }} />
              </Badge>
            </Dropdown>
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
