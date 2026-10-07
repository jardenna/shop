import { ErrorBoundary } from 'react-error-boundary';
import { AddressInput } from '../../app/api/apiTypes/addressApiTypes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Skeleton from '../../components/skeleton/Skeleton';
import SkeletonCartList from '../../components/skeleton/skeletonCartList/SkeletonCartList';
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
import AddressList from './AddressList';

const AddressPage = () => {
  const { language } = useLanguage();
  const { data: addresses, isLoading, refetch } = useGetAddressesQuery();
  const { currentUser } = useAuth();
  const [updateAddress, { isLoading: isUpdateLoading }] =
    useUpdateAddressMutation();

  const handleUpdateAddress = async (address: AddressInput) => {
    if (!address.id) {
      return;
    }

    await updateAddress({
      id: address.id,
      address,
    }).unwrap();
  };

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
            isLoading={isUpdateLoading}
            addresses={addresses}
            language={language}
            username={currentUser?.username ?? ''}
            billingAddressId={billingAddressId}
            shippingAddressId={shippingAddressId}
            onUpdateAddress={handleUpdateAddress}
          />
        )}
      </ErrorBoundary>
    </>
  );
};

export default AddressPage;
