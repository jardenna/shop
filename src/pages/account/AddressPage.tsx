import Skeleton from '../../components/skeleton/Skeleton';
import SkeletonCardList from '../../components/skeleton/SkeletonCardList';
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
        <SkeletonCardList count={3} className="small-card">
          <Skeleton />
        </SkeletonCardList>
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
