import React from 'react';
import { Navigate, Outlet } from 'react-router';

const PrivateRoutes = () => {
  const token = localStorage.getItem('token');
  const auth = { token: token };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
