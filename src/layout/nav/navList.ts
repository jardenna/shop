import { IconName } from '../../types/enums';
import { AdminPath, LinkText, ShopPath } from './enums';
import type { NavItemsProps } from './Nav';

const navList: NavItemsProps[] = [
  {
    path: AdminPath.Root,
    linkText: LinkText.Home,
  },
  {
    path: AdminPath.Collection,
    linkText: LinkText.Collection,
    adHeading: 'discoverLatestTrends',
    subNav: [
      {
        path: ShopPath.Women,
        linkText: LinkText.Women,
        infoText: 'collectionSubWomenText',
      },
      {
        path: ShopPath.Men,
        linkText: LinkText.Men,
        infoText: 'collectionSubMenText',
        className: 'background-gray',
      },
      {
        path: ShopPath.Kids,
        linkText: LinkText.Kids,
        infoText: 'collectionSubKidsText',
      },
    ],
  },
  {
    path: AdminPath.About,
    linkText: LinkText.About,
  },
  {
    path: AdminPath.Contact,
    linkText: LinkText.Contact,
  },
];

const authItemsList = [
  {
    path: AdminPath.Login,
    linkText: LinkText.Login,
  },
  {
    path: AdminPath.Signup,
    linkText: LinkText.Signup,
  },
];

const adminNavList: NavItemsProps[] = [
  {
    path: AdminPath.AdminProfile,
    linkText: LinkText.Account,
    iconName: IconName.Account,
    iconSize: '24',
  },
  {
    path: AdminPath.AdminProducts,
    linkText: LinkText.Products,
    iconName: IconName.Products,
  },
  {
    path: AdminPath.AdminCategories,
    linkText: LinkText.Categories,
    iconName: IconName.Categories,
  },
  {
    path: AdminPath.AdminSubCategories,
    linkText: LinkText.SubCategories,
    iconName: IconName.SubCategories,
  },
  {
    path: AdminPath.Users,
    linkText: LinkText.Users,
    iconName: IconName.Users,
  },
  {
    path: AdminPath.AdminOrders,
    linkText: LinkText.Orders,
    iconName: IconName.Orders,
  },
];

export { adminNavList, authItemsList, navList };
