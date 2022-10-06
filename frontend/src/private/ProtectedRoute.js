import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ProtectedRoute = ({ redirectPath = '/user/login' }) => {
  const accessToken = 'Bearer ' + sessionStorage.getItem('accessToken');
  if (accessToken === 'Bearer null') {
    Swal.fire({
      icon: 'error',
      title: '로그인이 필요합니다.',
      showConfirmButton: false,
      timer: 1500,
    });
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
