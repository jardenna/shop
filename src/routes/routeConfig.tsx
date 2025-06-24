import { createBrowserRouter } from 'react-router';
import AdminLayout from '../adminLayout/AdminLayout';
import Layout from '../layout/Layout';
import { FrontPath, LinkText, MainPath } from '../layout/nav/enums';
import AboutPage from '../pages/AboutPage';
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
import CollectionLandingPage from '../pages/collections/CollectionLandingPage';
import CollectionPage from '../pages/collections/CollectionPage';
import ContactPage from '../pages/ContactPage';
import ErrorPage from '../pages/ErrorPage';
import FavoritesPage from '../pages/FavoritesPage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/LoginPage';
import CreateProductPage from '../pages/product/CreateProductPage';
import ProductPage from '../pages/product/ProductPage';
import UpdateProductPage from '../pages/product/UpdateProductPage';
import ViewProductPage from '../pages/product/ViewProductPage';
import ProtectedRoute from '../pages/ProtectedRoute';
import ShoppingChartPage from '../pages/ShoppingChartPage';
import SignupPage from '../pages/SignupPage';
import CreateSubCategoryPage from '../pages/subCategory/CreateSubCategoryPage';
import SubCategoryPage from '../pages/subCategory/SubCategoryPage';
import UpdateSubCategoryPage from '../pages/subCategory/UpdateSubCategoryPage';
import ViewSubCategoryPage from '../pages/subCategory/ViewSubCategoryPage';

const routeList = [
  {
    index: true,
    element: <HomePage />,
    label: LinkText.Home,
  },
  {
    path: MainPath.Collection,
    element: <CollectionLandingPage />,
    label: LinkText.Collection,
  },
  {
    path: `${MainPath.Collection}/:category`,
    element: <CollectionPage />,
    label: '',
  },
  {
    path: MainPath.About,
    element: <AboutPage />,
    label: LinkText.About,
  },
  {
    path: MainPath.Contact,
    element: <ContactPage />,
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
    element: <ShoppingChartPage />,
    label: LinkText.Kids,
  },
  {
    path: FrontPath.Favorites,
    element: <FavoritesPage />,
    label: LinkText.Favorites,
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
    label: LinkText.CreateNewProduct,
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
