import { AdminPath, LinkText, ShopPath } from '../../layout/nav/enums';
import type { RouteListProps } from './Breadcrumbs';

const routeBreadcrumbs: RouteListProps[] = [
  {
    path: AdminPath.Root,
    label: LinkText.Home,
  },
  {
    path: AdminPath.Collection,
    label: LinkText.Collection,
  },
  {
    path: `${AdminPath.Collection}/:category`,
    label: '',
  },
  {
    path: AdminPath.About,
    label: LinkText.About,
  },
  {
    path: AdminPath.Contact,
    label: LinkText.Contact,
  },
  {
    path: AdminPath.Login,
    label: LinkText.Kids,
  },
  {
    path: AdminPath.Signup,
    label: LinkText.Kids,
  },
  {
    path: AdminPath.MyAccount,
    label: LinkText.Kids,
  },
  {
    path: AdminPath.Orders,
    label: LinkText.Kids,
  },
  {
    path: AdminPath.ShoppingCart,
    label: LinkText.Kids,
  },
  {
    path: ShopPath.Favorites,
    label: LinkText.Favorites,
  },
];

const adminBreadcrumbs: RouteListProps[] = [
  {
    path: AdminPath.Root,
    label: LinkText.Dashboard,
  },
  {
    path: AdminPath.Users,
    label: LinkText.Users,
  },
  {
    path: AdminPath.AdminUserCreate,
    label: LinkText.CreateNewUser,
  },
  {
    path: AdminPath.AdminCategoryCreate,
    label: LinkText.CreateNewCategory,
  },
  {
    path: AdminPath.AdminSubCategoryCreate,
    label: LinkText.CreateNewCategory,
  },
  {
    path: `${AdminPath.AdminCategoryUpdate}/:id`,
    label: '',
  },
  {
    path: `${AdminPath.AdminSubCategoryUpdate}/:id`,
    label: '',
  },
  {
    path: AdminPath.AdminSubCategories,
    label: LinkText.Categories,
  },
  {
    path: `${AdminPath.AdminSubCategoryView}/:id`,
    label: '',
  },
  {
    path: AdminPath.AdminProfile,
    label: LinkText.Profile,
  },
  {
    path: AdminPath.AdminProducts,
    label: LinkText.Products,
  },
  {
    path: `${AdminPath.AdminProductView}/:id`,
    label: '',
  },
  {
    path: AdminPath.AdminProductCreate,
    label: LinkText.CreateNewProduct,
  },
  {
    path: `${AdminPath.AdminProductUpdate}/:id`,
    label: '',
  },
  {
    path: AdminPath.AdminCategories,
    label: LinkText.Categories,
  },
  {
    path: AdminPath.AdminOrders,
    label: LinkText.Orders,
  },
];

export { adminBreadcrumbs, routeBreadcrumbs };
