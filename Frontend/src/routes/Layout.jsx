import React, { useContext, useEffect, useState } from 'react';
import PageRoutes from './PageRoutes';
import { Authenticate } from 'Validate/AuthContext';

const Layout = () => {
  const { setAuth, setCurrentUser } = useContext(Authenticate);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth');
    const currentUser = localStorage.getItem('currentUser');

    if (isAuth && currentUser) {
      setAuth(isAuth);
      setCurrentUser(JSON.parse(currentUser));
    }
  }, [localStorage.getItem('isAuth'), localStorage.getItem('isAuth')]);
  return (
    <div className="bg-slate-100/40">
      <PageRoutes />
    </div>
  );
};

export default Layout;
