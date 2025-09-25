import { Outlet, useLocation } from 'react-router';
import Img from '../components/Img';
import useLanguage from '../features/language/useLanguage';
import FullSizePageContainer from '../pages/pageContainer/FullSizePageContainer';
import { getPathInfo } from '../utils/utils';
import LayoutElement from './LayoutElement';

const AccountLayout = () => {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  const info = getPathInfo(pathname);
  console.log(info.title);

  return (
    <FullSizePageContainer metaTitle={language.myAccount}>
      <section className="account">
        <div className="test">
          <LayoutElement as="nav" ariaLabel="brugerkonto">
            <ul className="nav">
              <li>Personlige oplysninger</li>
              <li>Adresser</li>
              <li>Ordrer</li>
            </ul>
          </LayoutElement>
          <div className="content-test">
            <Outlet />
          </div>
        </div>
        <div className="img-wrapper">
          <Img src="/images/about/woman.jpg" alt="" />
        </div>
      </section>
    </FullSizePageContainer>
  );
};

export default AccountLayout;
