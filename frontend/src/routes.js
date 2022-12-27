import React from 'react';
import { Navigate, useRoutes, useNavigate } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import UserCreate from './pages/dashboard/UserCreate';
import DashboardAppPage from './pages/DashboardAppPage';
import UserList from './pages/UserList';
import Incharge from './pages/incharge';
import Student from './pages/student';
import InchargeInfo from './pages/inchargeInfo';
import StudentResult from './pages/studentResult';
import AddResult from './pages/studentResult/addResult';
import Remarks from './pages/remarks';


export default function Router() {

  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user'))
  const onInit = () => {
    if (!user) {
      return navigate('/login', { replace: true });
    }
    return navigate('/dashboard', { replace: true });
  }

  React.useEffect(() => {
    onInit()
  }, []);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [{ path: '', element: <DashboardAppPage /> }],
    },
    {
      path: 'user',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <UserList /> },
        { path: 'create', element: <UserCreate /> },
        { path: 'edit/:id', element: <UserCreate /> },
      ],
    },
    {
      path: 'incharge',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Incharge /> }
      ],
    },
    {
      path: 'remarks',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Remarks /> }
      ],
    },
    {
      path: 'incharge_info',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <InchargeInfo /> }
      ],
    },
    {
      path: 'student',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Student /> }
      ],
    },
    {
      path: 'student_result',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <StudentResult /> },
      ],
    },
    {
      path: 'add_result',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <AddResult /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
