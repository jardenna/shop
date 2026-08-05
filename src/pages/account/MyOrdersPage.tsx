import Button from '../../components/Button';
import { useLanguage } from '../../features/language/useLanguage';
import MyOrderItem from '../../features/orders/components/myOrders/MyOrderItem';
import { useGetUserOrderQuery } from '../../features/orders/orderApiSlice';
import EmptyState from '../../features/shop/components/emptyState/EmptyState';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';
import { ShopPath } from '../../layout/nav/enums';
import { formatOrderNumber } from '../../utils/formatOrderNo';
import MainPageContainer from '../pageContainer/MainPageContainer';

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
        <ul>
          {myOrders.map((cart) => (
            <>
              <div>
                <span>{language.order}</span>
                <span>{formatOrderNumber(cart.id)}</span>
                <div className="badge">
                  In transit Preparing Shipped Closed Behandles Leveret Afsendt
                </div>
              </div>

              <div>
                <ProductPrice price={cart.summary.totalPrice} />
              </div>
              <li key={cart.id}>
                {cart.orderItems.map((order) => (
                  <MyOrderItem
                    key={order.id}
                    order={order}
                    language={language}
                  />
                ))}
              </li>
              <div>Estimated delivery: Oct 24, 2026 </div>
              <Button>Vis detaljer </Button>
            </>
          ))}
        </ul>
      )}
    </MainPageContainer>
  );
};

export default MyOrdersPage;
