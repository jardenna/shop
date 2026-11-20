import type { IconNameValue } from '../../types/types';
import { AdminPath, LinkText, ShopPath } from './navConstants';
import type { LinkTextValue } from './navTypes';

export interface BaseNav {
  linkText: LinkTextValue;
  path: string;
}

export interface SubBaseNavList extends BaseNav {
  infoText: string;
  className?: string;
}

export interface NavListProps extends BaseNav {
  className?: string;
  end?: boolean;
  hasBadgeCount?: boolean;
  heading?: string;
  iconName?: IconNameValue;
  subNavList?: SubBaseNavList[];
  type?: string;
}

interface AccountNavList extends BaseNav {
  end?: boolean;
}

interface AdminNavList extends BaseNav {
  iconName: IconNameValue;
  className?: string;
  end?: boolean;
  hasBadgeCount?: boolean;
}

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
];

export const adminNavList: AdminNavList[] = [
  {
    path: AdminPath.AdminProducts,
    linkText: LinkText.Products,
    iconName: 'products',
  },
  {
    path: AdminPath.AdminCategories,
    linkText: LinkText.Categories,
    iconName: 'categories',
  },
  {
    path: AdminPath.AdminSubCategories,
    linkText: LinkText.SubCategories,
    iconName: 'subCategories',
  },
  {
    path: AdminPath.Users,
    linkText: LinkText.Users,
    iconName: 'users',
  },
  {
    path: AdminPath.AdminOrders,
    linkText: LinkText.Orders,
    iconName: 'orders',
  },
  {
    path: AdminPath.AdminReviews,
    linkText: LinkText.Reviews,
    iconName: 'star',
    hasBadgeCount: true,
    className: 'review-nav-item',
  },
  {
    path: AdminPath.Goals,
    linkText: LinkText.Goals,
    iconName: 'settings',
  },
  {
    path: AdminPath.AdminDiscountCodes,
    linkText: LinkText.DiscountCodes,
    iconName: 'discount',
  },
  {
    path: ShopPath.Root,
    linkText: LinkText.Shop,
    iconName: 'basket',
  },
];

export const accountNavList: AccountNavList[] = [
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
  ...subNavList.map(({ path, linkText }) => ({ path, linkText })),
  {
    path: ShopPath.Sale,
    linkText: LinkText.Sale,
  },
];

export const footerServiceNav: BaseNav[] = [
  {
    path: ShopPath.Faq,
    linkText: LinkText.Faq,
  },
  {
    path: ShopPath.ShippingAndReturns,
    linkText: LinkText.ShippingAndReturns,
  },
  {
    path: ShopPath.CustomerService,
    linkText: LinkText.ContactCustomerService,
  },
];

export const footerCompanyNav: BaseNav[] = [
  {
    path: ShopPath.AboutUs,
    linkText: LinkText.AboutUs,
  },
  {
    path: ShopPath.TermsAndConditions,
    linkText: LinkText.TermsAndConditions,
  },
  {
    path: ShopPath.Privacy,
    linkText: LinkText.Privacy,
  },
  {
    path: ShopPath.Cookies,
    linkText: LinkText.Cookies,
  },
  {
    path: ShopPath.AccessibilityStatement,
    linkText: LinkText.AccessibilityStatement,
  },
];

export const footerAccountNav: BaseNav[] = [
  {
    path: ShopPath.MyOrders,
    linkText: LinkText.MyOrders,
  },
  {
    path: ShopPath.Login,
    linkText: LinkText.Login,
  },
];
