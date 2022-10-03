import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ redirectPath = '/user/login' }) => {
  const accessToken = 'Bearer ' + sessionStorage.getItem('accessToken');
  if (accessToken === 'Bearer null') {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
