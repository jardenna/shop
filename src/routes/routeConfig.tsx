import { createBrowserRouter } from 'react-router';
import AdminLayout from '../features/admin/layout/AdminLayout';
import Layout from '../layout/Layout';
import { MainPath } from '../layout/nav/enums';
import About from '../pages/About';
import MyAccount from '../pages/account/MyAccount';
import Orders from '../pages/account/Orders';
import CategoryPage from '../pages/admin/CategoryPage';
import CreateCategoryPage from '../pages/admin/CreateCategoryPage';
import Dashboard from '../pages/admin/Dashboard';
import OrderPage from '../pages/admin/OrderPage';
import ProductPage from '../pages/admin/ProductPage';
import ProfilePage from '../pages/admin/ProfilePage';
import UpdateCategoryPage from '../pages/admin/UpdateCategoryPage';
import UpdateProductPage from '../pages/admin/UpdateProductPage';
import UserPage from '../pages/admin/UserPage';
import Collections from '../pages/Collections';
import Contact from '../pages/Contact';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../pages/ProtectedRoute';
import ShoppingChart from '../pages/ShoppingChart';
import SignupPage from '../pages/SignupPage';
import SubCategoryPage from '../pages/admin/SubCategoryPage';

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
      {
        path: MainPath.ShoppingCart,
        element: <ShoppingChart />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: MainPath.Admin,
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: MainPath.Users,
            element: <UserPage />,
          },
          {
            path: `${MainPath.AdminProductUpdate}/:id`,
            element: <UpdateProductPage />,
          },
          {
            path: MainPath.AdminCategoryCreate,
            element: <CreateCategoryPage />,
          },
          {
            path: `${MainPath.AdminCategoryUpdate}/:id`,
            element: <UpdateCategoryPage />,
          },
          {
            path: MainPath.AdminSubCategories,
            element: <SubCategoryPage />,
          },
          {
            path: `${MainPath.AdminSubCategoryUpdate}/:id`,
            element: <UpdateCategoryPage />,
          },
          {
            path: MainPath.AdminProfile,
            element: <ProfilePage />,
          },
          {
            path: MainPath.AdminProducts,
            element: <ProductPage />,
          },
          {
            path: MainPath.AdminCategories,
            element: <CategoryPage />,
          },
          {
            path: MainPath.AdminOrders,
            element: <OrderPage />,
          },
        ],
      },
    ],
  },
]);

export default routeConfig;
