import { Outlet, useLocation } from 'react-router';
import Img from '../components/Img';
import useLanguage from '../features/language/useLanguage';
import FullSizePageContainer from '../pages/pageContainer/FullSizePageContainer';
import LayoutElement from './LayoutElement';

const AccountLayout = () => {
  const { language } = useLanguage();
  const location = useLocation();
  console.log(location.pathname);

  return (
    <FullSizePageContainer heading={language.myAccount}>
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
