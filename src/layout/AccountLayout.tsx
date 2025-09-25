import { Outlet, useLocation } from 'react-router';
import Img from '../components/Img';
import useLanguage from '../features/language/useLanguage';
import { getPathInfo } from '../utils/utils';
import './accountLayout.styles.scss';
import LayoutElement from './LayoutElement';
import MetaTags from './nav/MetaTags';

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
            <LayoutElement as="nav" ariaLabel="brugerkonto">
              <ul className="nav">
                <li>Personlige oplysninger</li>
                <li>Adresser</li>
                <li>Ordrer</li>
              </ul>
            </LayoutElement>
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
