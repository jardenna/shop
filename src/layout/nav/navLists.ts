import { IconName } from '../../types/enums';
import { AdminPath, LinkText, ShopPath } from './enums';
import type { BaseNav, NavListProps } from './Nav';

export const navList: NavListProps[] = [
  {
    path: ShopPath.Collection,
    linkText: LinkText.Collection,
    heading: 'discoverLatestTrends',
    subNavList: [
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
    path: ShopPath.AboutUs,
    linkText: LinkText.AboutUs,
  },
  {
    path: ShopPath.Contact,
    linkText: LinkText.Contact,
  },
];

export const adminNavList: BaseNav[] = [
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

export const accountNavList: BaseNav[] = [
  {
    path: '',
    linkText: LinkText.MyAccount,
    end: true,
  },
  {
    path: ShopPath.MyAddresses,
    linkText: LinkText.MyAddresses,
  },
];
