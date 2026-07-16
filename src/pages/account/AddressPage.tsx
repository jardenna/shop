import Skeleton from '../../components/skeleton/Skeleton';
import SkeletonCardList from '../../components/skeleton/SkeletonCardList';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import AddressList from './AddressList';

const AddressPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading, refetch } = useGetUserProfileQuery();

  return (
    <>
      <p>{language.addOrManageAddress}</p>
      {isLoading && (
        <SkeletonCardList count={3} className="small-card">
          <Skeleton />
        </SkeletonCardList>
      )}

      {profile && (
        <AddressList
          addresses={profile.addresses}
          language={language}
          username={profile.username}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default AddressPage;
