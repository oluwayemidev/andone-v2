import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "../pages/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Button,
  Input,
  Skeleton,
  Avatar,
  Divider,
  Badge,
  Typography,
} from "antd";
import { SendOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
import {
  format,
  isValid,
  startOfDay,
  differenceInMinutes,
  formatDistanceToNowStrict,
  differenceInSeconds,
} from "date-fns";
import "../styles/AdminChat.css";
import { useLocation, useNavigate } from "react-router-dom";

const AdminChat = () => {
  const [users, setUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null); // Store selected user ID
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const [filteredUsers, setFilteredUsers] = useState([]); // State to hold filtered users
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateAdminStatus = async (status) => {
      try {
        const adminDocRef = doc(db, "users", "klEUZ49aaOVI3POtOiJXXCDAn2J2"); // Replace 'adminUID' with your admin user's UID
        await updateDoc(adminDocRef, {
          online: status,
          updatedAt: serverTimestamp(),
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
      const usersQuery = query(
        collection(db, "users"),
        orderBy("lastMessageTime", "desc")
      );
      const unsubscribe = onSnapshot(usersQuery, (querySnapshot) => {
        const usersList = querySnapshot.docs
          .filter((doc) => doc.id !== "klEUZ49aaOVI3POtOiJXXCDAn2J2") // Exclude admin user
          .map((doc) => ({
            ...doc.data(),
            uid: doc.id,
          }));
        setUsers(usersList);
        setFilteredUsers(usersList); // Initialize filtered users with all users
      });

      return unsubscribe;
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMessages = () => {
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const allMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllMessages(allMessages);
      });

      return unsubscribe;
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    // Parse the user ID from the hash fragment in the URL
    const userIdFromHash = location.hash.substring(1);
    setSelectedUserId(userIdFromHash); // Update selected user ID
  }, [location.hash]);

  useEffect(() => {
    if (selectedUserId) {
      setLoadingMessages(true);

      // Filter messages for the selected user
      const filteredMessages = allMessages.filter(
        (message) =>
          (message.uid === selectedUserId &&
            message.responseTo === "admin@andonesolar.com") || // Messages sent by selected user
          (message.responseTo === selectedUserId &&
            message.uid === "klEUZ49aaOVI3POtOiJXXCDAn2J2") // Responses to selected user
      );
      setUserMessages(filteredMessages);
      setLoadingMessages(false);

      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }

      // Mark messages as read when a user is selected
      filteredMessages.forEach(async (msg) => {
        if (
          msg.uid === selectedUserId &&
          msg.responseTo === "admin@andonesolar.com" &&
          !msg.read
        ) {
          const msgRef = doc(db, "messages", msg.id);
          await updateDoc(msgRef, { read: true });
        }
      });
    }
  }, [selectedUserId, allMessages]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [userMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUserId) return;

    const { uid, email } = auth.currentUser;
    const timestamp = serverTimestamp();

    setNewMessage("");

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: timestamp,
      uid,
      displayName: "Admin",
      responseTo: selectedUserId,
      email,
      read: false,
      updatedAt: timestamp,
    });

    // Update the lastMessageTime field in the users collection for the selected user
    const userDocRef = doc(db, "users", selectedUserId);
    await updateDoc(userDocRef, {
      lastMessageTime: timestamp,
    });
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
    const groupedMessages = groupMessagesByDate(userMessages);

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
              <div style={{ marginBottom: 10 }}>
                <b>
                  {message.displayName !== "Admin"
                    ? `${
                        message.displayName.length > 15
                          ? message.displayName.slice(0, 15) + "..."
                          : message.displayName
                      }`
                    : ""}
                </b>
              </div>
              {message.text}
              <div className="message-time">
                {formatDate(message.createdAt)}
              </div>
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
    return allMessages.filter(
      (msg) =>
        msg.uid === userUid &&
        msg.responseTo === "admin@andonesolar.com" &&
        !msg.read
    ).length;
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter users based on search query
    const filteredUsers = users.filter((user) => {
      // Check if display name or email matches the query
      const matchesDisplayName = user.displayName.toLowerCase().includes(query);
      const matchesEmail = user.email.toLowerCase().includes(query);

      // Check if any message sent by any user matches the query
      const hasMatchingMessage = allMessages.some(
        (message) =>
          message.uid === user.uid && message.text.toLowerCase().includes(query)
      );

      return matchesDisplayName || matchesEmail || hasMatchingMessage;
    });

    setFilteredUsers(filteredUsers);
  };

  const sortedUsers = [...filteredUsers]; // Use filteredUsers instead of users

  // Function to get the selected user's details
  const getSelectedUserDetails = () => {
    return users.find((user) => user.uid === selectedUserId);
  };

  const selectedUserDetails = getSelectedUserDetails();

  return (
    <div className="admin-chat-container">
      <div className="user-list">
        <div className="user-list-head">
          <h2>Chats</h2>
          {/* <Divider /> */}
          {/* Search input */}
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              marginBottom: "1rem",
              backgroundColor: "transparent",
              border: "none",
              borderBottom: "1px solid white",
              color: "white",
            }}
            addonBefore={<SearchOutlined style={{ color: "white" }} />}
            className="custom-search-input" // Add a custom class
          />
        </div>
        <div className="user-list-items">
          {/* User list */}
          {sortedUsers.map((user) => (
            <div
              key={user.uid}
              className={`user-item ${
                selectedUserId === user.uid ? "selected" : ""
              }`}
              onClick={() => setSelectedUserId(user.uid)}
              id={user.uid}
            >
              <Avatar className="user-avatar" icon={<UserOutlined />} />
              <div
                style={{
                  width: "fit-content",
                  overflow: "hidden",
                }}
              >
                <b>{user.displayName}</b>
                <Badge
                  offset={[10, -10]}
                  count={getUnreadMessagesCount(user.uid)}
                  style={{ backgroundColor: "#52c41a" }}
                />
                <Typography
                  style={{
                    width: "fit-content",
                    overflow: "hidden",
                    wordBreak: "keep-all",
                  }}
                >
                  ({user.email})
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-container">
        {selectedUserId ? (
          <div className="box">
            <div className="chat-head">
              <div>
                <Avatar icon={<UserOutlined />} />
                <h3>{selectedUserDetails?.displayName}</h3>
              </div>
              <div>
                <div>{selectedUserDetails?.email}</div>
              </div>
            </div>
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
