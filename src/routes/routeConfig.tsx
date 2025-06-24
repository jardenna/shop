import { createBrowserRouter } from 'react-router';
import AdminLayout from '../adminLayout/AdminLayout';
import Layout from '../layout/Layout';
import { AdminPath, LinkText, ShopPath } from '../layout/nav/enums';
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
    path: AdminPath.Collection,
    element: <CollectionLandingPage />,
    label: LinkText.Collection,
  },
  {
    path: `${AdminPath.Collection}/:category`,
    element: <CollectionPage />,
    label: '',
  },
  {
    path: AdminPath.About,
    element: <AboutPage />,
    label: LinkText.About,
  },
  {
    path: AdminPath.Contact,
    element: <ContactPage />,
    label: LinkText.Contact,
  },
  {
    path: AdminPath.Login,
    element: <LoginPage />,
    label: LinkText.Kids,
  },
  {
    path: AdminPath.Signup,
    element: <SignupPage />,
    label: LinkText.Kids,
  },
  {
    path: AdminPath.MyAccount,
    element: <MyAccount />,
    label: LinkText.Kids,
  },
  {
    path: AdminPath.Orders,
    element: <Orders />,
    label: LinkText.Kids,
  },
  {
    path: AdminPath.ShoppingCart,
    element: <ShoppingChartPage />,
    label: LinkText.Kids,
  },
  {
    path: ShopPath.Favorites,
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
    path: AdminPath.Users,
    element: <UserPage />,
    label: LinkText.Users,
  },
  {
    path: AdminPath.AdminUserCreate,
    element: <CreateUserPage />,
    label: LinkText.CreateNewUser,
  },
  {
    path: AdminPath.AdminCategoryCreate,
    element: <CreateCategoryPage />,
    label: LinkText.CreateNewCategory,
  },
  {
    path: AdminPath.AdminSubCategoryCreate,
    element: <CreateSubCategoryPage />,
    label: LinkText.CreateNewCategory,
  },
  {
    path: `${AdminPath.AdminCategoryUpdate}/:id`,
    element: <UpdateCategoryPage />,
    label: '',
  },
  {
    path: `${AdminPath.AdminSubCategoryUpdate}/:id`,
    element: <UpdateSubCategoryPage />,
    label: '',
  },
  {
    path: AdminPath.AdminSubCategories,
    element: <SubCategoryPage />,
    label: LinkText.Categories,
  },
  {
    path: `${AdminPath.AdminSubCategoryView}/:id`,
    element: <ViewSubCategoryPage />,
    label: '',
  },
  {
    path: AdminPath.AdminProfile,
    element: <ProfilePage />,
    label: LinkText.Profile,
  },
  {
    path: AdminPath.AdminProducts,
    element: <ProductPage />,
    label: LinkText.Products,
  },
  {
    path: `${AdminPath.AdminProductView}/:id`,
    element: <ViewProductPage />,
    label: '',
  },
  {
    path: AdminPath.AdminProductCreate,
    element: <CreateProductPage />,
    label: LinkText.CreateNewProduct,
  },
  {
    path: `${AdminPath.AdminProductUpdate}/:id`,
    element: <UpdateProductPage />,
    label: '',
  },
  {
    path: AdminPath.AdminCategories,
    element: <CategoryPage />,
    label: LinkText.Categories,
  },
  {
    path: AdminPath.AdminOrders,
    element: <OrderPage />,
    label: LinkText.Orders,
  },
];

const routeConfig = createBrowserRouter([
  {
    path: AdminPath.Root,
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: routeList,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: AdminPath.Admin,
        element: <AdminLayout />,
        children: adminRouteList,
      },
    ],
  },
]);

export default routeConfig;
