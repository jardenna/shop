import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import NavItemList from './NavItemList';
import { navList } from './navList';

export interface ActionBtnProps {
  ariaLabel?: string;
  className?: string;
  label?: string;
  onClick?: () => void;
}

const Nav: FC = () => {
  const { language } = useLanguage();

  // const getTitle = (pathname: string): string => {
  //   if (pathname === `/${MainPath.Records}`) {
  //     return language.albums;
  //   }
  //   if (pathname === `/${MainPath.Create}`) {
  //     return language.createAlbum;
  //   }
  //   if (pathname.includes(`/${MainPath.Details}`)) {
  //     return language.details;
  //   }
  //   if (pathname.includes(`/${MainPath.Update}`)) {
  //     return language.updateAlbum;
  //   }
  //   if (pathname === MainPath.Root) {
  //     return language.home;
  //   }
  //   if (pathname === `/${MainPath.Login}`) {
  //     return language.login;
  //   }
  //   return '';
  // };

  // const title = getTitle(location.pathname);

  return (
    <section className="main-nav">
      <NavItemList navItemsList={navList} ariaLabel={language.main} />
    </section>
  );
};

export default Nav;
