import IconContent from '../../components/IconContent';

import Icon from '../../components/icons/Icon';
import { useLanguage } from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import LayoutElement from '../LayoutElement';
import {
  footerAccountNav,
  footerCompanyNav,
  footerServiceNav,
  footerShopNav,
} from '../nav/navLists';
import './_footer.scss';
import FooterNav from './FooterNav';

const Footer = () => {
  const { language } = useLanguage();

  return (
    <LayoutElement ariaLabel="main" as="footer" className="main-footer">
      <div className="container">
        <article className="footer-container">
          <section className="footer-shop-info">
            <Icon
              iconName={IconName.Logo}
              title="Fashion Fusion Logo"
              ariaHidden={false}
              desc="Logo"
            />

            <div className="footer-social-container">
              <IconContent iconName={IconName.Facebook} ariaLabel="Facbook" />
              <IconContent
                iconName={IconName.Instagram}
                ariaLabel="Instagram"
              />
              <IconContent iconName={IconName.Tiktok} ariaLabel="Tiktok" />
            </div>
          </section>
          <section className="footer-nav-container">
            <FooterNav navList={footerCompanyNav} heading={language.company} />
            <FooterNav
              navList={footerServiceNav}
              heading={language.customerService}
            />
            <FooterNav navList={footerShopNav} heading={language.shop} />
            <FooterNav navList={footerAccountNav} heading={language.account} />
          </section>
        </article>
      </div>
    </LayoutElement>
  );
};
export default Footer;
