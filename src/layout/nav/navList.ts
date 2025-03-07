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

export { authItemsList, navList };
