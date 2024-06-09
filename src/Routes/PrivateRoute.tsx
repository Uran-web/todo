import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { publicPaths } from '../configs/routes';

import Layout from '../Components/Layouts/Layout';

export interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = observer(({ children }) => {
  if (!localStorage.getItem('access_token')) {
    return <Navigate to={publicPaths.login} replace />;
  }

  return <Layout>{children}</Layout>;
});

export default PrivateRoute;
