import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, List, Avatar } from 'antd';
import io from 'socket.io-client';
import axios from 'axios';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const socket = io('http://localhost:5000');

const Chat = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    };
    
    fetchUsers();
    
    socket.on('message', (data) => {
      if (data.to === selectedUser || data.from === selectedUser) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [selectedUser, token]);

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        const response = await axios.get('http://localhost:5000/api/chatMessages/get', {
          params: { from: 'admin', to: selectedUser },
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(response.data);
      };
      fetchMessages();
    }
  }, [selectedUser, token]);

  const handleSendMessage = () => {
    const data = { from: 'admin', to: selectedUser, message };
    socket.emit('sendMessage', data);
    setMessages((prevMessages) => [...prevMessages, data]);
    setMessage('');
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" width={250}>
        <Menu mode="inline">
          {users.map(user => (
            <Menu.Item key={user._id} onClick={() => setSelectedUser(user.username)}>
              {user.username}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h2>Chat with {selectedUser}</h2>
        </Header>
        <Content style={{ padding: '24px', overflow: 'auto' }}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{item.from.charAt(0).toUpperCase()}</Avatar>}
                  title={item.from}
                  description={item.message}
                />
              </List.Item>
            )}
          />
          <TextArea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={handleSendMessage}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Chat;
