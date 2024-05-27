import React, { useState, useEffect } from 'react';
import { List, Input, Button } from 'antd';
import { io } from 'socket.io-client';
import useAuth from '../../hooks/useAuth';

const UserChat = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socket = io('https://andonesolar.onrender.com/');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socket.disconnect();
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { sender: user._id, content: message });
            setMessage('');
        }
    };

    return (
        <div>
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
        </div>
    );
};

export default UserChat;
