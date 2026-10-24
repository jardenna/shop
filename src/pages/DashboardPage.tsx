import Cart from '../components/carts/Cart';
import Icon from '../components/icons/Icon';
import Img from '../components/Img';
import { useLanguage } from '../features/language/useLanguage';
import { IconName } from '../types/enums';
import './DashboardPage.styles.scss';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer
      heading={language.dashboard}
      variant="x-large"
      hideBreadCrumbs
    >
      <Cart>
        <div>
          <div>
            <Icon iconName={IconName.Account} />
            <section>
              <h2>New customers</h2>
              <div>
                <span>123.5</span>
                <span> + 3%</span>
              </div>
              <div>78 shipped today</div>
            </section>
            <Img alt="" src="/test.jpg" />
          </div>
        </div>
      </Cart>
    </AdminPageContainer>
  );
};

export default DashboardPage;
