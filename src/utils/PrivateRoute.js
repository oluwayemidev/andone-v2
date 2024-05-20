import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return userInfo && userInfo.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
