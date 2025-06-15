import { JSX } from 'react';
import { createBrowserRouter } from 'react-router';
import AdminLayout from '../adminLayout/AdminLayout';
import Layout from '../layout/Layout';
import { FrontPath, LinkText, MainPath } from '../layout/nav/enums';
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

export type Routes = {
  element: JSX.Element;
  label: LinkText | string;
  index?: boolean;
  path?: string;
};

export const routeList = [
  {
    index: true,
    element: <HomePage />,
    label: LinkText.Home,
  },
  {
    path: FrontPath.Men,
    element: <Men />,
    label: LinkText.Men,
  },
  {
    path: FrontPath.Women,
    element: <Women />,
    label: LinkText.Women,
  },
  {
    path: FrontPath.Kids,
    element: <Kids />,
    label: LinkText.Kids,
  },
  {
    path: MainPath.Collection,
    element: <CollectionsPage />,
    label: LinkText.Collection,
  },
  {
    path: MainPath.About,
    element: <About />,
    label: LinkText.About,
  },
  {
    path: MainPath.Contact,
    element: <Contact />,
    label: LinkText.Contact,
  },
  {
    path: MainPath.Login,
    element: <LoginPage />,
    label: LinkText.Kids,
  },
  {
    path: MainPath.Signup,
    element: <SignupPage />,
    label: LinkText.Kids,
  },
  {
    path: MainPath.MyAccount,
    element: <MyAccount />,
    label: LinkText.Kids,
  },
  {
    path: MainPath.Orders,
    element: <Orders />,
    label: LinkText.Kids,
  },
  {
    path: MainPath.ShoppingCart,
    element: <ShoppingChart />,
    label: LinkText.Kids,
  },
];

export const adminRouteList = [
  {
    index: true,
    element: <Dashboard />,
    label: LinkText.Dashboard,
  },
  {
    path: MainPath.Users,
    element: <UserPage />,
    label: LinkText.Users,
  },
  {
    path: MainPath.AdminUserCreate,
    element: <CreateUserPage />,
    label: LinkText.CreateNewUser,
  },
  {
    path: MainPath.AdminCategoryCreate,
    element: <CreateCategoryPage />,
    label: LinkText.CreateNewCategory,
  },
  {
    path: MainPath.AdminSubCategoryCreate,
    element: <CreateSubCategoryPage />,
    label: LinkText.CreateNewCategory,
  },
  {
    path: `${MainPath.AdminCategoryUpdate}/:id`,
    element: <UpdateCategoryPage />,
    label: '',
  },
  {
    path: `${MainPath.AdminSubCategoryUpdate}/:id`,
    element: <UpdateSubCategoryPage />,
    label: '',
  },
  {
    path: MainPath.AdminSubCategories,
    element: <SubCategoryPage />,
    label: LinkText.Categories,
  },
  {
    path: `${MainPath.AdminSubCategoryView}/:id`,
    element: <ViewSubCategoryPage />,
    label: '',
  },
  {
    path: MainPath.AdminProfile,
    element: <ProfilePage />,
    label: LinkText.Profile,
  },
  {
    path: MainPath.AdminProducts,
    element: <ProductPage />,
    label: LinkText.Products,
  },
  {
    path: `${MainPath.AdminProductView}/:id`,
    element: <ViewProductPage />,
    label: '',
  },
  {
    path: MainPath.AdminProductCreate,
    element: <CreateProductPage />,
    label: 'LinkText.CreateNewProduct',
  },
  {
    path: `${MainPath.AdminProductUpdate}/:id`,
    element: <UpdateProductPage />,
    label: '',
  },
  {
    path: MainPath.AdminCategories,
    element: <CategoryPage />,
    label: LinkText.Categories,
  },
  {
    path: MainPath.AdminOrders,
    element: <OrderPage />,
    label: LinkText.Orders,
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
        children: adminRouteList,
      },
    ],
  },
]);

export default routeConfig;
