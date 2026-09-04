import { createBrowserRouter } from 'react-router';
import AdminLayout from '../adminLayout/AdminLayout';
import AccountLayout from '../layout/AccountLayout';
import Layout from '../layout/Layout';
import { AdminPath, ShopPath } from '../layout/nav/enums';
import AboutUsPage from '../pages/AboutUsPage';
import AddressPage from '../pages/account/AddressPage';
import MyAccountPage from '../pages/account/MyAccountPage';
import Dashboard from '../pages/admin/Dashboard';
import AdminOrderDetailsPage from '../pages/adminOrderPage/AdminOrderDetailsPage';
import AdminOrderPage from '../pages/adminOrderPage/AdminOrderPage';
import CategoryPage from '../pages/category/CategoryPage';
import CreateCategoryPage from '../pages/category/CreateCategoryPage';
import UpdateCategoryPage from '../pages/category/UpdateCategoryPage';
import CheckoutPage from '../pages/CheckoutPage';
import CollectionPage from '../pages/CollectionPage';
import ContactPage from '../pages/ContactPage';
import ErrorPage from '../pages/ErrorPage';
import FavoritePage from '../pages/FavoritePage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/LoginPage';
import MainCollectionsPage from '../pages/MainCollectionsPage';
import MyOrderDetailsPage from '../pages/MyOrderDetailsPage';
import MyOrdersPage from '../pages/MyOrdersPage';
import CreateProductPage from '../pages/product/CreateProductPage';
import ProductPage from '../pages/product/ProductPage';
import UpdateProductPage from '../pages/product/UpdateProductPage';
import ViewProductPage from '../pages/product/ViewProductPage';
import ProtectedRoute from '../pages/ProtectedRoute';
import RegisterUserPage from '../pages/RegisterUserPage';
import Salespage from '../pages/SalesPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import SingleProductPage from '../pages/SingleProductPage';
import CreateSubCategoryPage from '../pages/subCategory/CreateSubCategoryPage';
import SubCategoryPage from '../pages/subCategory/SubCategoryPage';
import UpdateSubCategoryPage from '../pages/subCategory/UpdateSubCategoryPage';
import ViewSubCategoryPage from '../pages/subCategory/ViewSubCategoryPage';
import CreateUserPage from '../pages/users/CreateUserPage';
import UserPage from '../pages/users/UserPage';

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
    path: ShopPath.Sale,
    element: <Salespage />,
  },
  {
    path: ShopPath.SaleCategory,
    element: <Salespage />,
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
    element: <RegisterUserPage />,
  },
  {
    path: ShopPath.ShoppingCart,
    element: <ShoppingCartPage />,
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
    element: <CreateUserPage />,
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
    element: <AdminOrderPage />,
  },
  {
    path: `${AdminPath.AdminOrderById}:id`,
    element: <AdminOrderDetailsPage />,
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
            element: <FavoritePage />,
          },
          { path: ShopPath.Checkout, element: <CheckoutPage /> },
          {
            path: `${ShopPath.MyOrder}/:id`,
            element: <MyOrderDetailsPage />,
          },
          {
            path: ShopPath.MyOrders,
            element: <MyOrdersPage />,
          },
          {
            path: ShopPath.MyAccount,
            element: <AccountLayout />,
            children: [
              {
                path: '',
                element: <MyAccountPage />,
              },

              {
                path: ShopPath.MyAddresses,
                element: <AddressPage />,
              },
            ],
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
