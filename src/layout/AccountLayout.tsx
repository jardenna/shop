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
    account: 'accountAlttext',
    orders: 'orderAlttext',
    addresses: 'addressAlttext',
  };
  const altText = altTextMap[imgName];

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
          <Picture
            src={`${src}.jpg`}
            srcSet={`${src}.avif`}
            alt={language[altText]}
          />
        </div>
      </article>
    </>
  );
};

export default AccountLayout;
