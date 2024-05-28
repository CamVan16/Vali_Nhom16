import React from 'react';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';

const ProtectedRoute = ({ children, isAdminRoute }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const userID = localStorage.getItem('userID');

  if (!userID) {
    message.error('Bạn hãy đăng nhập');
    return <Navigate to="/SignIn" />;
  }

  if (isAdminRoute && !isAdmin) {
    message.error('Bạn không phải là admin');
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
