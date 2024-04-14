import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Protected = ({
  children,
  adminOnly,
}) => {
  const { isAuthenticated, isLoggedIn, user } = useSelector(
    (state) => state.authUser
  );

  if (!isAuthenticated && !isLoggedIn) {
    console.log("called");
    return <Navigate to="/login" />;
  }
  if (adminOnly &&  !user?.isAdmin && isAuthenticated){
    return <Navigate to="/" />;
  }

  return children
};

export default Protected;
