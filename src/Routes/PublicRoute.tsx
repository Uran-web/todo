import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { privatePaths } from '../configs/routes';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = observer(({ children }) => {
  if (localStorage.getItem('access_token')) {
    return <Navigate to={privatePaths['todoList']} replace />;
  }

  return children;
});

export default PublicRoute;
