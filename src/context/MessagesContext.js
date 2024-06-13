// src/contexts/MessagesContext.js
import React, { createContext, useState, useEffect } from 'react';

export const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from your backend or API
    const fetchMessages = async () => {
      const response = await fetch('/api/messages'); // Adjust the API endpoint as needed
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  const unreadCount = messages.filter(message => !message.read).length;

  return (
    <MessagesContext.Provider value={{ messages, unreadCount }}>
      {children}
    </MessagesContext.Provider>
  );
};
