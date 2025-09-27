import { Outlet, useLocation } from 'react-router';
import Img from '../components/Img';
import useLanguage from '../features/language/useLanguage';
import { getPathName, titleToCamelCase } from '../utils/utils';
import './accountLayout.styles.scss';
import MetaTags from './nav/MetaTags';
import NavContainer from './nav/NavContainer';
import { accountNavList } from './nav/navLists';

const AccountLayout = () => {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  const pathInfo = getPathName(pathname);

  const createdTitle = titleToCamelCase(pathInfo);
  const title = language[createdTitle];

  return (
    <>
      <MetaTags metaTitle={title} />
      <article className="container account-page">
        <article className="account-page-container">
          <NavContainer navList={accountNavList} ariaLabel={language.account} />
          <section className="account-page-content">
            <h1>{title}</h1>
            <Outlet />
          </section>
        </article>
        <div>
          <Img src="/images/account/account.jpg" alt="" />
          <Img src="/images/account/order.jpg" alt="" />
          <Img src="/images/account/address.jpg" alt="" />
        </div>
      </article>
    </>
  );
};

export default AccountLayout;
