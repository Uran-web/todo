import React, { lazy, Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privatePaths, publicPaths } from './configs/routes';

import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';

const LoginPage = lazy(() => import('./Pages/Auth/LoginPage'));
const SignUpPage = lazy(() => import('./Pages/Auth/SignUpPage'));
const TODOPage = lazy(() => import('./Pages/TODOs/TodoPage'));

export interface IRoutes {
  path: string;
  Component: React.ReactNode;
}

const App = observer(() => {
  const privateRoutes: IRoutes[] = [
    { path: privatePaths.todoList, Component: <TODOPage /> },
  ];

  const publicRoutes: IRoutes[] = [
    { path: publicPaths.signup, Component: <SignUpPage /> },
    { path: publicPaths.login, Component: <LoginPage /> },
  ];

  return (
    <Suspense>
      <Routes>
        {privateRoutes.map((publicRoute) => (
          <Route
            key={publicRoute.path}
            path={publicRoute.path}
            element={<PrivateRoute>{publicRoute.Component}</PrivateRoute>}
          ></Route>
        ))}

        {publicRoutes.map((publicRoute) => (
          <Route
            key={publicRoute.path}
            path={publicRoute.path}
            element={<PublicRoute>{publicRoute.Component}</PublicRoute>}
          ></Route>
        ))}

        <Route path="*" element={<Navigate to={'/login'} replace />}></Route>
        <Route path="/" element={<Navigate to={'/login'} replace />}></Route>
      </Routes>
    </Suspense>
  );
});

export default App;
