import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Skeleton from '../../components/skeleton/Skeleton';
import SkeletonCartList from '../../components/skeleton/skeletonCartList/SkeletonCartList';
import AddressList from '../../features/address/AddressList';
import AddressListFooter from '../../features/address/AddressListFooter';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useGetAddressesQuery,
  useUpdateAddressMutation,
} from '../../features/profile/addressesApiSlice';
import {
  findStandardAddress,
  getAddressUpdates,
  StandardAddressIds,
} from '../../utils/addressUtils';

const AddressPage = () => {
  const { language } = useLanguage();
  const { data: addresses, isLoading, refetch } = useGetAddressesQuery();
  const { currentUser } = useAuth();
  const [updateAddress] = useUpdateAddressMutation();

  const handleChangeAddress = async ({
    shippingAddressId,
    billingAddressId,
  }: StandardAddressIds) => {
    const addressUpdates = getAddressUpdates({
      shippingAddressId,
      billingAddressId,
    });

    for (const { addressId, standardAddress } of addressUpdates) {
      const address = addresses?.find((item) => item.id === addressId);

      if (!address) {
        return;
      }

      await updateAddress({
        id: address.id,
        address: {
          ...address,
          standardAddress,
        },
      }).unwrap();
    }
  };

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
            onChangeAddress={handleChangeAddress}
            addresses={addresses}
            language={language}
            username={currentUser?.username ?? ''}
            billingAddressId={billingAddressId}
            shippingAddressId={shippingAddressId}
            renderAddressFooter={(address) => (
              <AddressListFooter address={address} language={language} />
            )}
          />
        )}
      </ErrorBoundary>
    </>
  );
};

export default AddressPage;
