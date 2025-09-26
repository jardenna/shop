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
      <article>
        <section className="main-page account">
          <div className="test">
            <NavContainer navList={accountNavList} ariaLabel="brugerkonto" />
            <div className="content-test">
              <h1>{title}</h1>
              <Outlet />
            </div>
          </div>
          <div className="img-wrapper">
            <Img src="/images/about/woman.jpg" alt="" />
          </div>
        </section>
      </article>
    </>
  );
};

export default AccountLayout;
