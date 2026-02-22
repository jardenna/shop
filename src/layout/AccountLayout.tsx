import { useId } from 'react';
import { Outlet, useLocation } from 'react-router';
import Picture from '../components/Picture';
import useLanguage from '../features/language/useLanguage';
import { getPathName, titleToCamelCase } from '../utils/utils';
import './accountLayout.styles.scss';
import MetaTags from './nav/MetaTags';
import NavContainer from './nav/NavContainer';
import { accountNavList } from './nav/navLists';

const AccountLayout = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  const pathInfo = getPathName(pathname);
  const createdTitle = titleToCamelCase(pathInfo);
  const title = language[createdTitle];
  const imgName = pathInfo.replace('my-', '');
  const src = `/images/account/${imgName}`;

  const altTextMap: Record<string, string> = {
    account: 'accountAltText',
    orders: 'orderAltText',
    addresses: 'addressAltText',
  };
  const altText = altTextMap[imgName];
  const adminLayoutId = useId();

  return (
    <>
      <MetaTags metaTitle={title} />
      <div className="container account-page">
        <section
          className="account-content-container"
          aria-labelledby={adminLayoutId}
        >
          <NavContainer
            navList={accountNavList}
            ariaLabel={language.account}
            className="account-nav"
          />
          <div className="account-page-content">
            <header>
              <h1 id={adminLayoutId}>{title}</h1>
            </header>
            <Outlet />
          </div>
        </section>
        <div className="account-img-container">
          <Picture
            src={`${src}.jpg`}
            srcSet={`${src}.avif`}
            alt={language[altText]}
          />
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
