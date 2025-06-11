import { IconName } from '../../types/enums';
import { FrontPath, LinkText, MainPath } from './enums';
import { NavItemsProps } from './Nav';

const navList: NavItemsProps[] = [
  {
    path: MainPath.Root,
    linkText: LinkText.Home,
  },
  {
    path: MainPath.Collection,
    linkText: LinkText.Collection,
    adHeading: 'discoverLatestTrends',
    subNav: [
      {
        path: FrontPath.Women,
        linkText: LinkText.Women,
        infoText: 'collectionSubWomenText',
      },
      {
        path: FrontPath.Men,
        linkText: LinkText.Men,
        infoText: 'collectionSubMenText',
        className: 'background-gray',
      },
      {
        path: FrontPath.Kids,
        linkText: LinkText.Kids,
        infoText: 'collectionSubKidsText',
      },
    ],
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

const adminNavList: NavItemsProps[] = [
  {
    path: MainPath.AdminProfile,
    linkText: LinkText.Account,
    iconName: IconName.Account,
    iconSize: '24',
  },
  {
    path: MainPath.AdminProducts,
    linkText: LinkText.Products,
    iconName: IconName.Products,
  },
  {
    path: MainPath.AdminCategories,
    linkText: LinkText.Categories,
    iconName: IconName.Categories,
  },
  {
    path: MainPath.AdminSubCategories,
    linkText: LinkText.SubCategories,
    iconName: IconName.SubCategories,
  },
  {
    path: MainPath.Users,
    linkText: LinkText.Users,
    iconName: IconName.Users,
  },
  {
    path: MainPath.AdminOrders,
    linkText: LinkText.Orders,
    iconName: IconName.Orders,
  },
];

export { adminNavList, authItemsList, navList };
