import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ path, authenticated }) => {
  const authenticated = useContext(UserContext);

  if (authenticated && path === '/') {
    return <Route path={path} />;
  } else if (!authenticated && (path === '/login' || path === '/register')) {
    return <Route path={path} />;
  } else if (authenticated && (path === '/login' || path === '/register')) {
    //redirect
    return <Redirect />;
  }

  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
