import { IconName } from '../../types/enums';
import { AdminPath, LinkText, ShopPath } from './enums';
export interface BaseNav {
  linkText: LinkText;
  path: string;
}

export interface SubBaseNavList extends BaseNav {
  infoText: string;
  className?: string;
}

export interface NavListProps extends BaseNav {
  end?: boolean;
  heading?: string;
  iconName?: IconName;
  subNavList?: SubBaseNavList[];
  type?: string;
}

interface AccountNavList extends BaseNav {
  end?: boolean;
}

interface AdminNavList extends BaseNav {
  iconName: IconName;
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
  {
    path: ShopPath.Root,
    linkText: LinkText.Shop,
    iconName: IconName.Basket,
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
