import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "../pages/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Button, Input, Skeleton, Avatar, Divider, Badge } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import {
  format,
  isValid,
  startOfDay,
  differenceInMinutes,
  formatDistanceToNowStrict,
  differenceInSeconds,
} from "date-fns";
import "../styles/AdminChat.css";

const AdminChat = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const updateAdminStatus = async (status) => {
      try {
        const adminDocRef = doc(db, "users", "klEUZ49aaOVI3POtOiJXXCDAn2J2"); // Replace 'adminUID' with your admin user's UID
        await updateDoc(adminDocRef, {
          online: status,
        });
      } catch (error) {
        console.error("Error updating admin status:", error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === "admin@andonesolar.com") {
        updateAdminStatus(true); // Admin is online
      } else {
        updateAdminStatus(false); // Admin is offline
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUsers = () => {
      const usersQuery = query(collection(db, "users"));
      const unsubscribe = onSnapshot(usersQuery, (querySnapshot) => {
        const usersList = querySnapshot.docs
          .filter((doc) => doc.id !== "klEUZ49aaOVI3POtOiJXXCDAn2J2") // Exclude admin user
          .map((doc) => ({
            ...doc.data(),
            uid: doc.id,
          }));
        setUsers(usersList);
      });

      return unsubscribe;
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoadingMessages(true);
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const allMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(
          allMessages.filter(
            (message) =>
              message.uid === selectedUser.uid ||
              (message.responseTo && message.responseTo === selectedUser.uid)
          )
        );
        setLoadingMessages(false);
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
        }

        // Mark messages as read
        const unreadMessages = snapshot.docs.filter(
          (doc) =>
            doc.data().uid === selectedUser.uid &&
            doc.data().responseTo === "klEUZ49aaOVI3POtOiJXXCDAn2J2" && // Replace 'adminUID' with your admin user's UID
            !doc.data().read
        );

        unreadMessages.forEach(async (msg) => {
          const msgRef = doc(db, "messages", msg.id);
          await updateDoc(msgRef, { read: true });
        });
      });

      return () => unsubscribe();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const { uid, email } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid,
      displayName: "Admin",
      responseTo: selectedUser.uid,
      email,
      read: false,
    });

    setNewMessage("");
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const formatDate = (timestamp) => {
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

  const renderMessagesWithDateSeparator = () => {
    const groupedMessages = groupMessagesByDate(messages);

    return Object.keys(groupedMessages).map((date) => (
      <div key={date}>
        <div className="message-date">{format(new Date(date), "MMMM d, yyyy")}</div>
        {groupedMessages[date].map((message, index) => (
          <div key={index} className="message-container">
            <div
              className={`message ${
                message.uid === auth.currentUser.uid ? "sent" : "received"
              }`}
            >
              <span>
                <b>
                  {message.displayName !== "Admin"
                    ? `${message.displayName}: `
                    : ""}
                </b>
              </span>
              {message.text}
              <div className="message-time">{formatDate(message.createdAt)}</div>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    messages.forEach((message) => {
      try {
        const messageDate = message.createdAt?.toDate();
        if (!isValid(messageDate)) return;
        const formattedDate = startOfDay(messageDate).toISOString(); // Grouping by start of day
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

  const getUnreadMessagesCount = (userUid) => {
    return messages.filter((msg) => msg.uid === userUid && !msg.read).length;
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aMessageTime = a.latestMessage?.createdAt?.toDate() || new Date(0);
    const bMessageTime = b.latestMessage?.createdAt?.toDate() || new Date(0);
    return bMessageTime - aMessageTime;
  });

  return (
    <div className="admin-chat-container">
      <div className="user-list">
        <h2>Chat</h2>
        <Divider />
        {sortedUsers.map((user) => (
          <div
            key={user.uid}
            className={`user-item ${
              selectedUser && selectedUser.uid === user.uid ? "selected" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <Avatar className="user-avatar" icon={<UserOutlined />} />
            <div>
              <b>{user.displayName}</b> ({user.email})
              <Badge count={getUnreadMessagesCount(user.uid)} style={{ backgroundColor: '#52c41a' }} />
            </div>
          </div>
        ))}
      </div>
      <div className="chat-container">
        {selectedUser ? (
          <div className="box">
            <div className="messages" ref={messagesContainerRef}>
              {loadingMessages ? (
                <Skeleton active />
              ) : (
                renderMessagesWithDateSeparator()
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="response-input">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a response"
                onPressEnter={handleSendMessage}
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
        ) : (
          <div className="no-user-selected">
            Select a user to see the conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
