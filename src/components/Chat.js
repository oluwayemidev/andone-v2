import React, { useEffect, useState, useRef } from 'react';
import { auth, db } from '../pages/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { Avatar, Button, Input, Modal, message } from 'antd';
import { LogoutOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { format, formatDistanceToNowStrict, isValid, differenceInMinutes, differenceInSeconds } from 'date-fns';
import '../styles/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filteredMessages = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(message => 
          message.uid === auth.currentUser.uid || 
          (message.email === 'admin@andonesolar.com' && message.responseTo === auth.currentUser.uid)
        );
      setMessages(filteredMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (auth.currentUser && !auth.currentUser.displayName) {
      setShowModal(true);
    }
  }, [auth.currentUser]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      message.error("Message cannot be empty");
      return;
    }
    const { uid, displayName, email } = auth.currentUser;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid,
        displayName,
        email,
        responseTo: 'admin@andonesolar.com',
      });
      setNewMessage('');
    } catch (error) {
      message.error("Failed to send message");
      console.error("Error sending message: ", error);
    }
  };

  const handleLogout = () => {
    auth.signOut().catch(error => {
      message.error("Failed to log out");
      console.error("Error during logout: ", error);
    });
  };

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      message.error("Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
        await updateDoc(doc(db, 'users', auth.currentUser.uid), { displayName: name });
        message.success("Profile updated successfully.");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      message.error("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  const formatRelativeTime = (timestamp) => {
    try {
      const date = timestamp?.toDate();
      if (!isValid(date)) return '';
      const now = new Date();
      const diffInMinutes = differenceInMinutes(now, date);
      const diffInSeconds = differenceInSeconds(now, date);

      if (diffInSeconds < 10) {
        return 'just now';
      } else if (diffInMinutes < 60) {
        return format(date, 'hh:mm a');
      } else {
        return formatDistanceToNowStrict(date, { addSuffix: true });
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    messages.forEach((message) => {
      try {
        const messageDate = message.createdAt?.toDate();
        if (!isValid(messageDate)) return;
        const now = new Date();
        const diffInMinutes = differenceInMinutes(now, messageDate);

        if (diffInMinutes >= 60) {
          const formattedDate = format(messageDate, 'yyyy-MM-dd');
          if (!groupedMessages[formattedDate]) {
            groupedMessages[formattedDate] = [];
          }
          groupedMessages[formattedDate].push(message);
        } else {
          if (!groupedMessages['recent']) {
            groupedMessages['recent'] = [];
          }
          groupedMessages['recent'].push(message);
        }
      } catch (error) {
        console.error('Error grouping messages by date:', error);
      }
    });
    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="user-chat-container">
      <div className='chat-head'>
        <div>
          <Avatar icon={<UserOutlined />} />
          <h3>{auth.currentUser.displayName}</h3>
        </div>
        <Button className="logout-button" icon={<LogoutOutlined />} onClick={handleLogout} />
      </div>
      <div className='box'>
        <div className="messages" ref={messagesContainerRef}>
          {Object.keys(groupedMessages).map((date) => (
            <div key={date}>
              {date !== 'recent' && (
                <div className="date-separator">
                  {format(new Date(date), 'MMMM d, yyyy')}
                </div>
              )}
              {groupedMessages[date].map((message, index) => (
                <div key={index} className="message-container">
                  <div className={`message ${message.uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                    <span><b>{message.displayName === 'Admin' ? 'AndOne: ' : ''}</b></span>
                    {message.text}
                    <div className="message-time">{formatRelativeTime(message.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onPressEnter={handleSendMessage}
            placeholder="Type a message"
          />
          <Button className="send-btn" type="primary" icon={<SendOutlined />} onClick={handleSendMessage}>Send</Button>
        </div>
      </div>

      <Modal
        title="Enter your name"
        visible={showModal}
        onOk={handleUpdateProfile}
        onCancel={() => setShowModal(false)}
        confirmLoading={loading}
      >
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Chat;
