import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const isToken = localStorage.getItem('token') ? false : true;
  return isToken ? <Outlet /> : <Navigate to='/main' replace />;
};
