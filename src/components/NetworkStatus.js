import React, { useState, useEffect } from 'react';
import { notification } from 'antd';

const NetworkStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setOnline(navigator.onLine);
      if (!navigator.onLine) {
        notification.error({
          message: 'Network Error',
          description: 'You are currently offline. Please check your internet connection.',
          duration: 0,
        });
      } else {
        notification.destroy();
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return null; // This component does not render anything
};

export default NetworkStatus;
