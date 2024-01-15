import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../components/Loading/Loading';
import { adminRoutes, authRoutes, publicRoutes, studentRoute } from './routes';
import NavBar from 'components/Header/NavBar';
import Footer from 'components/Footer/Footer';
import AdminSidebar from 'components/AdminSidebar';
import NotFound from 'pages/NotFound';
import { Authenticate } from 'Validate/AuthContext';

const PageRoutes = () => {
  const { isAuth } = useContext(Authenticate);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  <NavBar />
                  <div className="min-h-custom-body">
                    <Page />
                  </div>
                  <Footer />
                </>
              }
            />
          );
        })}

        {/* Authentication Page*/}
        {authRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<>{isAuth ? <Navigate to="/" /> : <Page />}</>} />;
        })}

        {/* Admin */}
        {adminRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  {(currentUser && currentUser.RoleId !== process.env.REACT_APP_ADMIN_ROLE_ID) || !currentUser ? (
                    <Navigate to="/" />
                  ) : (
                    <div className="flex min-h-screen">
                      <AdminSidebar />
                      <div className="w-full lg:w-4/5 bg-slate-100/40">
                        <Page />
                      </div>
                    </div>
                  )}
                </>
              }
            />
          );
        })}
        {/* Student */}
        {studentRoute.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  <NavBar />
                  <div className="min-h-custom-body">
                    <Page />
                  </div>
                  <Footer />
                </>
              }
            />
          );
        })}

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default PageRoutes;
