import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return userInfo && userInfo.token && userInfo.role === 'admin' ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
