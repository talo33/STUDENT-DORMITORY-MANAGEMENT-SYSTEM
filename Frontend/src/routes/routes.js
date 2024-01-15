// Common
import HomePage from 'pages/HomePage';

// Admin
import AdminDashboardPage from 'pages/Admin/AdminDashboardPage';
import RoomDetailPage from 'pages/Admin/RoomDetailPage';
import RoomAddPage from 'pages/Admin/RoomAddPage';
import RoomListPage from 'pages/Admin/RoomListPage';
import SignupPage from 'pages/Admin/SignupPage';
import React from 'react';
import StudentList from 'pages/Admin/StudentList';
import BillListPage from 'pages/Admin/BillListPage';
import RequestsList from 'pages/Admin/Requests';

// Public
const Room = React.lazy(() => import('pages/Public/RoomMenuPage'));
const Login = React.lazy(() => import('Validate/Login'));
const PolicyPage = React.lazy(() => import('pages/Public/PolicyPage'));

// Student
const Student = React.lazy(() => import('pages/Student/StudentProfile'));
const RoomHistory = React.lazy(() => import('pages/Student/RoomHistory'));

// const { default: Login } = require('Validate/Login');
const { default: Logout } = require('Validate/Logout');

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/home', component: HomePage },
  { path: '/room', component: Room },
  { path: '/policy/register', component: PolicyPage }
];

const authRoutes = [
  { path: '/login', component: Login },
  { path: '/logout', component: Logout }
];

const adminRoutes = [
  { path: '/admin', component: AdminDashboardPage },
  { path: '/admin/student/signup', component: SignupPage },
  { path: '/admin/student/list', component: StudentList },
  { path: '/admin/room/list', component: RoomListPage },
  { path: '/admin/room/:id', component: RoomDetailPage },
  { path: '/admin/room/add', component: RoomAddPage },
  { path: '/admin/bill/list', component: BillListPage },
  { path: '/admin/bill/:id', component: RoomDetailPage },
  { path: '/admin/requests', component: RequestsList }
];

const studentRoute = [
  { path: '/student/profile/:id', component: Student },
  { path: '/student/room/history', component: RoomHistory }
];

export { authRoutes, publicRoutes, adminRoutes, studentRoute };
