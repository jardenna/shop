import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Skeleton from '../../components/skeleton/Skeleton';
import SkeletonCartList from '../../components/skeleton/skeletonCartList/SkeletonCartList';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetAddressesQuery } from '../../features/profile/addressesApiSlice';
import { findStandardAddress } from '../../utils/addressUtils';
import AddressList from './AddressList';

const AddressPage = () => {
  const { language } = useLanguage();
  const { data: addresses, isLoading, refetch } = useGetAddressesQuery();
  const { currentUser } = useAuth();

  const shippingAddressId = findStandardAddress({
    id: 'addressDelivery',
    addresses,
  });

  const billingAddressId = findStandardAddress({
    id: 'addressBilling',
    addresses,
  });

  return (
    <>
      <p>{language.addOrManageAddress}</p>
      {isLoading && (
        <SkeletonCartList count={3} className="small-cart">
          <Skeleton />
        </SkeletonCartList>
      )}
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        {addresses && (
          <AddressList
            addresses={addresses}
            language={language}
            username={currentUser?.username ?? ''}
            billingAddressId={billingAddressId}
            shippingAddressId={shippingAddressId}
          />
        )}
      </ErrorBoundary>
    </>
  );
};

export default AddressPage;
