import { createBrowserRouter } from 'react-router';
import Layout from '../layout/Layout';
import { MainPath } from '../layout/nav/enums';
import About from '../pages/About';
import Collections from '../pages/Collections';
import Contact from '../pages/Contact';
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
