import Skeleton from '../../components/skeleton/Skeleton';
import SkeletonCartList from '../../components/skeleton/skeletonCartList/SkeletonCartList';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetAddressesQuery } from '../../features/profile/addressesApiSlice';
import AddressList from './AddressList';

const AddressPage = () => {
  const { language } = useLanguage();
  const { data: addresses, isLoading, refetch } = useGetAddressesQuery();
  const { currentUser } = useAuth();

  return (
    <>
      <p>{language.addOrManageAddress}</p>
      {isLoading && (
        <SkeletonCartList count={3} className="small-cart">
          <Skeleton />
        </SkeletonCartList>
      )}

      {addresses && (
        <AddressList
          addresses={addresses}
          language={language}
          username={currentUser?.username ?? ''}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default AddressPage;
