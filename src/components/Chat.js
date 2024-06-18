import React, { useEffect, useState, useRef } from "react";
import { auth, db, onAuthStateChanged, signOut } from "../pages/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Avatar, Badge, Button, Input, Modal, message } from "antd";
import { LogoutOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import {
  format,
  formatDistanceToNowStrict,
  isValid,
  differenceInMinutes,
  differenceInSeconds,
  startOfDay,
} from "date-fns";
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [adminOnline, setAdminOnline] = useState(false);

  // Detect when admin logs in and out
  useEffect(() => {
    const adminDocRef = doc(db, "users", "klEUZ49aaOVI3POtOiJXXCDAn2J2");
    const unsubscribe = onSnapshot(adminDocRef, (doc) => {
      if (doc.exists()) {
        setAdminOnline(doc.data().online);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filteredMessages = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (message) =>
            auth.currentUser &&
            (message.uid === auth.currentUser.uid ||
              (message.email === "admin@andonesolar.com" &&
                message.responseTo === auth.currentUser.uid))
        );
      setMessages(filteredMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // useEffect(() => {
  //   if (auth.currentUser && !auth.currentUser.displayName) {
  //     setShowModal(true);
  //   }
  // }, [auth.currentUser]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      message.error("Message cannot be empty");
      return;
    }
    const { uid, displayName, email } = auth.currentUser;
    const timestamp = serverTimestamp();

    setNewMessage("");
    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: timestamp,
        uid,
        displayName,
        email,
        responseTo: "admin@andonesolar.com",
        read: false,
        updatedAt: timestamp,
      });

      // Update the lastMessageTime field in the users collection for the current user
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, {
        lastMessageTime: timestamp,
      });

    } catch (error) {
      message.error("Failed to send message");
      console.error("Error sending message: ", error);
    }
  };

  const handleLogout = () => {
    auth.signOut().catch((error) => {
      message.error("Failed to log out");
      console.error("Error during logout: ", error);
    });
  };

  const formatRelativeTime = (timestamp) => {
    try {
      const date = timestamp?.toDate();
      if (!isValid(date)) return "";
      const now = new Date();
      const diffInMinutes = differenceInMinutes(now, date);
      const diffInSeconds = differenceInSeconds(now, date);

      if (diffInSeconds < 10) {
        return "just now";
      } else if (diffInMinutes < 60) {
        return format(date, "hh:mm a");
      } else {
        return formatDistanceToNowStrict(date, { addSuffix: true });
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    messages.forEach((message) => {
      try {
        const messageDate = message.createdAt?.toDate();
        if (!isValid(messageDate)) return;
        const formattedDate = startOfDay(messageDate).toISOString();
        if (!groupedMessages[formattedDate]) {
          groupedMessages[formattedDate] = [];
        }
        groupedMessages[formattedDate].push(message);
      } catch (error) {
        console.error("Error grouping messages by date:", error);
      }
    });
    return groupedMessages;
  };

  const renderMessagesWithDateSeparator = (groupedMessages) => {
    return Object.keys(groupedMessages).map((date) => (
      <div key={date}>
        <div className="message-date">
          {format(new Date(date), "MMMM d, yyyy")}
        </div>
        {groupedMessages[date].map((message, index) => (
          <div key={index} className="message-container">
            <div
              className={`message ${
                message.uid === auth.currentUser.uid ? "sent" : "received"
              }`}
            >
              <span>
                <b>{message.displayName === "Admin" ? "AndOne: " : ""}</b>
              </span>
              {message.text}
              <div className="message-time">
                {formatRelativeTime(message.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="user-chat-container">
      <div className="chat-head">
        <div>
          <Avatar icon={<UserOutlined />} />
          <h3>
            {auth.currentUser ? auth.currentUser.displayName : "Loading..."}
          </h3>
        </div>
        <div className="admin-status">
          <span>Status: </span>
          <Badge status={adminOnline ? "success" : "error"} />
          <span>{adminOnline ? "Online" : "Offline"}</span>
        </div>
        <Button
          className="logout-button"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        />
      </div>
      <div className="box">
        <div className="messages" ref={messagesContainerRef}>
          {renderMessagesWithDateSeparator(groupedMessages)}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onPressEnter={handleSendMessage}
            placeholder="Type a message"
          />
          <Button
            className="send-btn"
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </div>
      {/* <Modal
        title="Enter your name"
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
      </Modal> */}
    </div>
  );
};

export default Chat;
