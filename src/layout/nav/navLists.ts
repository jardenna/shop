import { IconName } from '../../types/enums';
import { AdminPath, LinkText, ShopPath } from './enums';
import type { AdminNavList, BaseNav, NavListProps } from './Nav';

const subNavList = [
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
];

export const navList: NavListProps[] = [
  {
    path: ShopPath.Collection,
    linkText: LinkText.Collection,
    heading: 'discoverLatestTrends',
    subNavList,
  },
  {
    path: ShopPath.Sale,
    linkText: LinkText.Sale,
    type: 'discount',
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

export const adminNavList: AdminNavList[] = [
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

// Footer nav lists
export const footerShopNav: BaseNav[] = [
  {
    path: ShopPath.Root,
    linkText: LinkText.Home,
  },
  ...subNavList.map(({ path, linkText }) => ({ path, linkText })),
  {
    path: ShopPath.Sale,
    linkText: LinkText.Sale,
  },
];

export const footerServiceNav: BaseNav[] = [
  {
    path: ShopPath.AboutUs,
    linkText: LinkText.Faq,
  },
  {
    path: ShopPath.Contact,
    linkText: LinkText.DeliveryAndReturn,
  },
  {
    path: ShopPath.Contact,
    linkText: LinkText.ContactCustomerService,
  },
];
