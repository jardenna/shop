import { Outlet, useLocation } from 'react-router';
import Img from '../components/Img';
import useLanguage from '../features/language/useLanguage';
import { getPathInfo } from '../utils/utils';
import './accountLayout.styles.scss';
import MetaTags from './nav/MetaTags';
import NavContainer from './nav/NavContainer';
import { accountNavList } from './nav/navLists';

const AccountLayout = () => {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  const pathInfo = getPathInfo(pathname);
  const title = language[pathInfo];

  return (
    <>
      <MetaTags metaTitle={title} />
      <article className="container account-page">
        <div className="account-page-container">
          <NavContainer navList={accountNavList} ariaLabel="brugerkonto" />
          <div className="account-page-content">
            <h1>{title}</h1>
            <Outlet />
          </div>
        </div>
        <div>
          <Img src="/images/about/woman.jpg" alt="" />
        </div>
      </article>
    </>
  );
};

export default AccountLayout;
