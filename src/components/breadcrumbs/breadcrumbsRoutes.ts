import { AdminPath, LinkText, ShopPath } from '../../layout/nav/enums';

export type RouteListProps = {
  path: string;
  label?: LinkText;
};
const routeBreadcrumbs: RouteListProps[] = [
  { path: ShopPath.Root, label: LinkText.Home },
  { path: ShopPath.Collection, label: LinkText.Collection },
  { path: `${ShopPath.Collection}/:category` },
  { path: `${ShopPath.Collection}/:category/:categoryId` },
  { path: `${ShopPath.Collection}/:category/:categoryId/:id` },
  { path: AdminPath.About, label: LinkText.About },
  { path: ShopPath.Contact, label: LinkText.Contact },
  { path: ShopPath.Login, label: LinkText.Login },
  { path: ShopPath.Signup, label: LinkText.Signup },
  { path: ShopPath.MyAccount, label: LinkText.MyAccount },
  { path: ShopPath.MyOrders, label: LinkText.Orders },
  { path: ShopPath.ShoppingCart, label: LinkText.Dashboard },
  { path: ShopPath.Favorites, label: LinkText.Favorites },
];

const adminBreadcrumbs = [
  {
    path: ShopPath.Root,
    label: LinkText.Dashboard,
  },
  {
    path: ShopPath.Users,
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
