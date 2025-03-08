import { createBrowserRouter } from 'react-router';
import Layout from '../layout/Layout';
import LayoutHome from '../layout/LayoutHome';
import { MainPath } from '../layout/nav/enums';
import About from '../pages/About';
import Collections from '../pages/Collections';
import Contact from '../pages/Contact';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProtectedRoute from '../pages/ProtectedRoute';
import Signup from '../pages/SignUp';

const routeConfig = createBrowserRouter([
  {
    path: MainPath.Root,
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
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
        element: <Login />,
      },
      {
        path: MainPath.Signup,
        element: <Signup />,
      },
      {
        element: <LayoutHome />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
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
