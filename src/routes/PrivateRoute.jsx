import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const isToken = localStorage.getItem('token') ? true : false;
  return isToken ? <Outlet /> : <Navigate to='/login' replace />;
};
