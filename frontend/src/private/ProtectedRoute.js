import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ redirectPath = '/user/login' }) => {
  const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
  if (!accessToken) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
