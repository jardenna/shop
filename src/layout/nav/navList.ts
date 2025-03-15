import { LinkText, MainPath } from './enums';

const navList = [
  {
    path: MainPath.Root,
    linkText: LinkText.Home,
  },
  {
    path: MainPath.Collection,
    linkText: LinkText.Collection,
  },
  {
    path: MainPath.About,
    linkText: LinkText.About,
  },
  {
    path: MainPath.Contact,
    linkText: LinkText.Contact,
  },
];

const authItemsList = [
  {
    path: MainPath.Login,
    linkText: LinkText.Login,
  },
  {
    path: MainPath.Signup,
    linkText: LinkText.Signup,
  },
];

const adminItemsList = [
  {
    path: MainPath.Dashboard,
    linkText: LinkText.Dashboard,
  },
  {
    path: MainPath.Users,
    linkText: LinkText.Users,
  },
  {
    path: MainPath.AdminProfile,
    linkText: LinkText.Profile,
  },
  {
    path: MainPath.AdminProducts,
    linkText: LinkText.Products,
  },
  {
    path: MainPath.AdminCategories,
    linkText: LinkText.Categories,
  },
  {
    path: MainPath.AdminOrders,
    linkText: LinkText.Orders,
  },
];

export { adminItemsList, authItemsList, navList };
