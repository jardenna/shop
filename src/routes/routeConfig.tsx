import { createBrowserRouter } from 'react-router';
import AdminLayout from '../adminLayout/AdminLayout';
import Layout from '../layout/Layout';
import { FrontPath, MainPath } from '../layout/nav/enums';
import About from '../pages/About';
import MyAccount from '../pages/account/MyAccount';
import Orders from '../pages/account/Orders';
import CreateUserPage from '../pages/admin/CreateUserPage';
import Dashboard from '../pages/admin/Dashboard';
import OrderPage from '../pages/admin/OrderPage';
import ProfilePage from '../pages/admin/ProfilePage';
import UserPage from '../pages/admin/UserPage';
import CategoryPage from '../pages/category/CategoryPage';
import CreateCategoryPage from '../pages/category/CreateCategoryPage';
import UpdateCategoryPage from '../pages/category/UpdateCategoryPage';
import CollectionsPage from '../pages/collections/CollectionsPage';
import Contact from '../pages/Contact';
import ErrorPage from '../pages/ErrorPage';
import Kids from '../pages/frontPages/Kids';
import Men from '../pages/frontPages/Men';
import Women from '../pages/frontPages/Women';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/LoginPage';
import CreateProductPage from '../pages/product/CreateProductPage';
import ProductPage from '../pages/product/ProductPage';
import UpdateProductPage from '../pages/product/UpdateProductPage';
import ViewProductPage from '../pages/product/ViewProductPage';
import ProtectedRoute from '../pages/ProtectedRoute';
import ShoppingChart from '../pages/ShoppingChart';
import SignupPage from '../pages/SignupPage';
import CreateSubCategoryPage from '../pages/subCategory/CreateSubCategoryPage';
import SubCategoryPage from '../pages/subCategory/SubCategoryPage';
import UpdateSubCategoryPage from '../pages/subCategory/UpdateSubCategoryPage';
import ViewSubCategoryPage from '../pages/subCategory/ViewSubCategoryPage';

export const routeList = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: FrontPath.Men,
    element: <Men />,
  },
  {
    path: FrontPath.Women,
    element: <Women />,
  },
  {
    path: FrontPath.Kids,
    element: <Kids />,
    label: 'Kiaads',
  },
  {
    path: MainPath.Collection,
    element: <CollectionsPage />,
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
];

const routeConfig = createBrowserRouter([
  {
    path: MainPath.Root,
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: routeList,
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
            path: MainPath.AdminUserCreate,
            element: <CreateUserPage />,
          },
          {
            path: MainPath.AdminCategoryCreate,
            element: <CreateCategoryPage />,
          },
          {
            path: MainPath.AdminSubCategoryCreate,
            element: <CreateSubCategoryPage />,
          },
          {
            path: `${MainPath.AdminCategoryUpdate}/:id`,
            element: <UpdateCategoryPage />,
          },
          {
            path: `${MainPath.AdminSubCategoryUpdate}/:id`,
            element: <UpdateSubCategoryPage />,
          },
          {
            path: MainPath.AdminSubCategories,
            element: <SubCategoryPage />,
          },
          {
            path: `${MainPath.AdminSubCategoryView}/:id`,
            element: <ViewSubCategoryPage />,
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
            path: `${MainPath.AdminProductView}/:id`,
            element: <ViewProductPage />,
          },
          {
            path: MainPath.AdminProductCreate,
            element: <CreateProductPage />,
          },
          {
            path: `${MainPath.AdminProductUpdate}/:id`,
            element: <UpdateProductPage />,
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
