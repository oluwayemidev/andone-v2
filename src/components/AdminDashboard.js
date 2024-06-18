// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
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
import {
  db,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
} from "../pages/firebase";
import "../styles/AdminDashboard.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const adminUid = "klEUZ49aaOVI3POtOiJXXCDAn2J2"; // Replace with your admin UID

  useEffect(() => {
    const fetchMessages = () => {
      const messagesRef = collection(db, "messages");
      const q = query(
        messagesRef,
        where("read", "==", false),
        where("uid", "!=", adminUid), // Exclude messages from admin
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUnreadCount(messages.length);
        setUnreadMessages(messages);
      });

      return () => unsubscribe();
    };

    fetchMessages();
  }, [adminUid]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Function to group unread messages by user
  const groupUnreadMessagesByUser = () => {
    const unreadMessagesByUser = {};
    unreadMessages.forEach((message) => {
      if (!unreadMessagesByUser[message.uid]) {
        unreadMessagesByUser[message.uid] = [];
      }
      unreadMessagesByUser[message.uid].push(message);
    });
    return unreadMessagesByUser;
  };

  // Function to get the last message for each user
  const getLastMessageForUser = (userUid) => {
    const messagesForUser = unreadMessages.filter(
      (message) => message.uid === userUid
    );
    const lastMessage = messagesForUser.length > 0 ? messagesForUser[0] : null; // Assuming messages are sorted by createdAt desc
    return lastMessage;
  };

  const messageMenu = (
    <Menu>
      {Object.keys(groupUnreadMessagesByUser()).map((userUid) => {
        const user = unreadMessages.find((message) => message.uid === userUid);
        const unreadCountForUser = groupUnreadMessagesByUser()[userUid].length;
        const lastMessage = getLastMessageForUser(userUid);

        return (
          <Menu.Item key={userUid}>
            <Link to={`/admin/chat#${userUid}`}>
              <Row gutter={10} align="middle">
                <Col>
                  <Avatar>{user.displayName.slice(0, 1).toUpperCase()}</Avatar>
                </Col>
                <Col>
                  <Row>
                    <Typography.Text strong>{user.displayName}</Typography.Text>
                  </Row>
                  <Row>
                    <Typography.Text type="secondary">
                      {user.email}
                    </Typography.Text>
                  </Row>
                </Col>
                <Col flex="auto" style={{ textAlign: "right" }}>
                  <div>
                    {lastMessage && (
                      <Typography.Text
                        type="secondary"
                        style={{ fontSize: 12 }}
                      >
                        {lastMessage.text.slice(0, 30) +
                          (lastMessage.text.length > 30 ? "..." : "")}
                      </Typography.Text>
                    )}
                    <br />
                    <Badge
                      count={unreadCountForUser}
                      offset={[10, 0]}
                      size="small"
                      showZero
                    />
                  </div>
                </Col>
              </Row>
            </Link>
          </Menu.Item>
        );
      })}
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
          top: 0,
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
          {!collapsed ? (
            <Menu.Item key="5" icon={<MessageOutlined />}>
                <Link style={{ color: "#ffffffa6" }} to="/admin/chat">
              <Badge count={unreadCount} offset={[10, 0]} size="small" showZero>
                  <span style={{ color: "#ffffffa6" }}>Live Chat</span>
              </Badge>
                </Link>
            </Menu.Item>
          ) : (
            <Menu.Item
              key="5"
              icon={
                <Badge
                  count={unreadCount}
                  offset={[5, 10]}
                  size='small'
                  showZero
                  // style={{ fontSize: '5px'}}
                >
                  <MessageOutlined />
                </Badge>
              }
            >
              <Link style={{ color: "#ffffffa6" }} to="/admin/chat">
                Live Chat
              </Link>
            </Menu.Item>
          )}
          <Menu.Item key="6" icon={<FileTextOutlined />}>
            <Link to="/admin/quotations">Quotations</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<BulbOutlined />}>
            <Link to="/admin/solar-results">Solar Results</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<SettingOutlined />} title="Customization">
            <Menu.Item key="9" icon={<FileMarkdownOutlined />}>
              <Link to="/admin/pages">Pages</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<ToolOutlined />}>
              <Link to="/admin/widgets">Widgets</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<SettingOutlined />}>
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
        <Content style={{ margin: "0", overflow: "initial" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
