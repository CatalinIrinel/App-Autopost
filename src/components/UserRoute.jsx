import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../contexts/ContextProvider';

function UserRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="/logare" />;
}

export default UserRoute;
