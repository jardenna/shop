import { createBrowserRouter } from 'react-router';
import AdminLayout from '../adminLayout/AdminLayout';
import Layout from '../layout/Layout';
import { AdminPath, ShopPath } from '../layout/nav/enums';
import AboutUsPage from '../pages/AboutUsPage';
import MyAccountPage from '../pages/account/MyAccountPage';
import OrdersPage from '../pages/account/OrdersPage';
import AdminCreateUserPage from '../pages/admin/AdminCreateUserPage';
import Dashboard from '../pages/admin/Dashboard';
import OrderPage from '../pages/admin/OrderPage';
import UserPage from '../pages/admin/UserPage';
import CategoryPage from '../pages/category/CategoryPage';
import CreateCategoryPage from '../pages/category/CreateCategoryPage';
import UpdateCategoryPage from '../pages/category/UpdateCategoryPage';
import CollectionPage from '../pages/CollectionPage';
import ContactPage from '../pages/ContactPage';
import CreateAccountPage from '../pages/CreateAccountPage';
import ErrorPage from '../pages/ErrorPage';
import FavoritesPage from '../pages/FavoritesPage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/LoginPage';
import MainCollectionsPage from '../pages/MainCollectionsPage';
import CreateProductPage from '../pages/product/CreateProductPage';
import ProductPage from '../pages/product/ProductPage';
import UpdateProductPage from '../pages/product/UpdateProductPage';
import ViewProductPage from '../pages/product/ViewProductPage';
import ProtectedRoute from '../pages/ProtectedRoute';
import ShoppingChartPage from '../pages/ShoppingChartPage';
import SingleProductPage from '../pages/SingleProductPage';
import CreateSubCategoryPage from '../pages/subCategory/CreateSubCategoryPage';
import SubCategoryPage from '../pages/subCategory/SubCategoryPage';
import UpdateSubCategoryPage from '../pages/subCategory/UpdateSubCategoryPage';
import ViewSubCategoryPage from '../pages/subCategory/ViewSubCategoryPage';

const routeList = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: ShopPath.Collection,
    element: <MainCollectionsPage />,
  },
  {
    path: ShopPath.CollectionCategory,
    element: <CollectionPage />,
  },
  {
    path: ShopPath.CollectionCategoryId,
    element: <CollectionPage />,
  },
  {
    path: ShopPath.CollectionSingleProduct,
    element: <SingleProductPage />,
  },
  {
    path: ShopPath.AboutUs,
    element: <AboutUsPage />,
  },
  {
    path: ShopPath.Contact,
    element: <ContactPage />,
  },
  {
    path: ShopPath.Login,
    element: <LoginPage />,
  },
  {
    path: ShopPath.CreateAccount,
    element: <CreateAccountPage />,
  },
  {
    path: ShopPath.MyAccount,
    element: <MyAccountPage />,
  },
  {
    path: ShopPath.MyOrders,
    element: <OrdersPage />,
  },
  {
    path: ShopPath.ShoppingCart,
    element: <ShoppingChartPage />,
  },
];

const adminRouteList = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: AdminPath.Users,
    element: <UserPage />,
  },
  {
    path: AdminPath.AdminUserCreate,
    element: <AdminCreateUserPage />,
  },
  {
    path: AdminPath.AdminCategoryCreate,
    element: <CreateCategoryPage />,
  },
  {
    path: AdminPath.AdminSubCategoryCreate,
    element: <CreateSubCategoryPage />,
  },
  {
    path: `${AdminPath.AdminCategoryUpdate}/:id`,
    element: <UpdateCategoryPage />,
  },
  {
    path: `${AdminPath.AdminSubCategoryUpdate}/:id`,
    element: <UpdateSubCategoryPage />,
  },
  {
    path: AdminPath.AdminSubCategories,
    element: <SubCategoryPage />,
  },
  {
    path: `${AdminPath.AdminSubCategoryView}/:id`,
    element: <ViewSubCategoryPage />,
  },
  {
    path: AdminPath.AdminProducts,
    element: <ProductPage />,
  },
  {
    path: `${AdminPath.AdminProductView}/:id`,
    element: <ViewProductPage />,
  },
  {
    path: AdminPath.AdminProductCreate,
    element: <CreateProductPage />,
  },
  {
    path: `${AdminPath.AdminProductUpdate}/:id`,
    element: <UpdateProductPage />,
  },
  {
    path: AdminPath.AdminCategories,
    element: <CategoryPage />,
  },
  {
    path: AdminPath.AdminOrders,
    element: <OrderPage />,
  },
];

const routeConfig = createBrowserRouter([
  {
    path: ShopPath.Root,
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: routeList,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: ShopPath.Favorites,
            element: <FavoritesPage />,
          },
        ],
      },
      {
        path: AdminPath.Admin,
        element: <AdminLayout />,
        children: adminRouteList,
      },
    ],
  },
]);

export default routeConfig;
