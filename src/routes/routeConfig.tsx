import { createBrowserRouter } from 'react-router';
import Layout from '../layout/Layout';
import { MainPath } from '../layout/nav/enums';
import About from '../pages/About';
import MyAccount from '../pages/account/MyAccount';
import Orders from '../pages/account/Orders';
import Collections from '../pages/Collections';
import Contact from '../pages/Contact';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../pages/ProtectedRoute';
import SignupPage from '../pages/SignupPage';

const routeConfig = createBrowserRouter([
  {
    path: MainPath.Root,
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: MainPath.Collection,
        element: <Collections />,
      },
      {
        path: MainPath.About,
        element: <About />,
      },
      {
        path: MainPath.Contact,
        element: <Contact />,
      },
      {
        path: MainPath.Login,
        element: <LoginPage />,
      },
      {
        path: MainPath.Signup,
        element: <SignupPage />,
      },
      {
        path: MainPath.MyAccount,
        element: <MyAccount />,
      },
      {
        path: MainPath.Orders,
        element: <Orders />,
      },

      // {
      //   element: <MyAccount />,
      //   children: [
      //     {
      //       index: true,
      //       element: <Orders />,
      //     },
      //   ],
      // },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <div>protected</div>,
          },
        ],
      },
    ],
  },
]);

export default routeConfig;
