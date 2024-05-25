import React, { useState, useEffect } from 'react';
import { List, Input, Button, Layout } from 'antd';
import { io } from 'socket.io-client';
import useAuth from '../../hooks/useAuth';

const { Sider, Content } = Layout;

const AdminChat = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [activeUser, setActiveUser] = useState(null);
    const [users, setUsers] = useState([]);
    const socket = io('http://localhost:5000');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Fetch users logic goes here (useEffect, API calls, etc.)

        return () => socket.disconnect();
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { sender: user._id, content: message });
            setMessage('');
        }
    };

    return (
        <Layout>
            <Sider width={300}>
                <List
                    dataSource={users}
                    renderItem={(usr) => (
                        <List.Item onClick={() => setActiveUser(usr)}>
                            {usr.name}
                        </List.Item>
                    )}
                />
            </Sider>
            <Content>
                <List
                    dataSource={messages}
                    renderItem={(msg) => (
                        <List.Item>
                            <List.Item.Meta
                                title={msg.sender.name}
                                description={msg.content}
                            />
                        </List.Item>
                    )}
                />
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onPressEnter={sendMessage}
                    placeholder="Type a message..."
                />
                <Button onClick={sendMessage} type="primary">
                    Send
                </Button>
            </Content>
        </Layout>
    );
};

export default AdminChat;
