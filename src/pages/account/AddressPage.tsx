import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';

const AddressPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();
  console.log(profile?.addresses);

  return (
    <>
      {isLoading && <SkeletonParagraph />}
      <p>{language.addOrManageAddress}</p>

      {profile && (
        <div>
          {profile.addresses.map((address) => (
            <div key={address.id}>{address.city}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddressPage;
