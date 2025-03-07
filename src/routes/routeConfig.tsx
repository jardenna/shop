import { createBrowserRouter } from 'react-router';
import Layout from '../layout/Layout';
import { MainPath } from '../layout/nav/enums';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import ProtectedRoute from '../pages/ProtectedRoute';

const routeConfig = createBrowserRouter([
  {
    path: MainPath.Root,
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: MainPath.Login,
        element: <div>login</div>,
      },
      {
        path: MainPath.Signup,
        element: <div>signup</div>,
      },

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
