import { FrontPath, LinkText, MainPath } from '../../layout/nav/enums';
import type { RouteListProps } from './Breadcrumbs';

const routeBreadcrumbs: RouteListProps[] = [
  {
    path: MainPath.Root,
    label: LinkText.Home,
  },
  {
    path: MainPath.Collection,
    label: LinkText.Collection,
  },
  {
    path: `${MainPath.Collection}/:category`,
    label: '',
  },
  {
    path: MainPath.About,
    label: LinkText.About,
  },
  {
    path: MainPath.Contact,
    label: LinkText.Contact,
  },
  {
    path: MainPath.Login,
    label: LinkText.Kids,
  },
  {
    path: MainPath.Signup,
    label: LinkText.Kids,
  },
  {
    path: MainPath.MyAccount,
    label: LinkText.Kids,
  },
  {
    path: MainPath.Orders,
    label: LinkText.Kids,
  },
  {
    path: MainPath.ShoppingCart,
    label: LinkText.Kids,
  },
  {
    path: FrontPath.Favorites,
    label: LinkText.Favorites,
  },
];

const adminBreadcrumbs: RouteListProps[] = [
  {
    path: MainPath.Root,
    label: LinkText.Dashboard,
  },
  {
    path: MainPath.Users,
    label: LinkText.Users,
  },
  {
    path: MainPath.AdminUserCreate,
    label: LinkText.CreateNewUser,
  },
  {
    path: MainPath.AdminCategoryCreate,
    label: LinkText.CreateNewCategory,
  },
  {
    path: MainPath.AdminSubCategoryCreate,
    label: LinkText.CreateNewCategory,
  },
  {
    path: `${MainPath.AdminCategoryUpdate}/:id`,
    label: '',
  },
  {
    path: `${MainPath.AdminSubCategoryUpdate}/:id`,
    label: '',
  },
  {
    path: MainPath.AdminSubCategories,
    label: LinkText.Categories,
  },
  {
    path: `${MainPath.AdminSubCategoryView}/:id`,
    label: '',
  },
  {
    path: MainPath.AdminProfile,
    label: LinkText.Profile,
  },
  {
    path: MainPath.AdminProducts,
    label: LinkText.Products,
  },
  {
    path: `${MainPath.AdminProductView}/:id`,
    label: '',
  },
  {
    path: MainPath.AdminProductCreate,
    label: LinkText.CreateNewProduct,
  },
  {
    path: `${MainPath.AdminProductUpdate}/:id`,
    label: '',
  },
  {
    path: MainPath.AdminCategories,
    label: LinkText.Categories,
  },
  {
    path: MainPath.AdminOrders,
    label: LinkText.Orders,
  },
];

export { adminBreadcrumbs, routeBreadcrumbs };
