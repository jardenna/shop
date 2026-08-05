import Badge from '../../components/badge/Badge';
import Button from '../../components/Button';
import { useLanguage } from '../../features/language/useLanguage';
import MyOrderList from '../../features/orders/components/myOrders/MyOrderList';
import { useGetUserOrderQuery } from '../../features/orders/orderApiSlice';
import EmptyState from '../../features/shop/components/emptyState/EmptyState';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';
import { ShopPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import { formatOrderNumber } from '../../utils/formatOrderNo';
import MainPageContainer from '../pageContainer/MainPageContainer';
import './_my-order-page.scss';

const MyOrdersPage = () => {
  const { language } = useLanguage();
  const { data: myOrders } = useGetUserOrderQuery();

  const pageHeading = language.myOrders;

  if (myOrders?.length === 0) {
    return (
      <EmptyState
        noProductText={language.shoppingBagEmpty}
        noProductTitle={language.shoppingBagEmptyTitle}
        src="/images/shoppingBags/shopping_bag_2"
        linkTo={`/${ShopPath.Collection}`}
        emtyStateCtaText={language.getInspired}
        pageHeading={pageHeading}
      />
    );
  }
  return (
    <MainPageContainer variant="medium" heading={pageHeading}>
      <p>{language.viewAndTrackOrders}</p>
      <p>{language.whenOrderViewAndTrack}</p>

      {myOrders && (
        <section className="my-orders">
          {myOrders.map((cart) => (
            <article key={cart.id} className="my-order-card">
              <header className="my-order-header">
                <div className="my-order-meta">
                  <span>
                    <span>{language.order}</span>{' '}
                    <span>{formatOrderNumber(cart.id)}</span>
                  </span>
                  <Badge variant="small" badgeText={language.orderCreated} />
                </div>
                <ProductPrice price={cart.summary.totalPrice} />
              </header>

              <MyOrderList orders={cart.orderItems} language={language} />

              <footer className="my-order-footer">
                <div>Estimated delivery: Oct 24, 2026</div>
                <Button variant={BtnVariant.Ghost}>Vis detaljer</Button>
              </footer>
            </article>
          ))}
        </section>
      )}
    </MainPageContainer>
  );
};

export default MyOrdersPage;
