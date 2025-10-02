import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';

const AddressPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  return (
    <>
      {isLoading && <SkeletonParagraph />}
      <p>{language.addOrManageAddress}</p>

      {profile && (
        <div>
          {profile.addresses.map((address) => (
            <div key={address.id}>
              <h2>{address.name || profile.username}</h2>
              <div>{address.street}</div>

              <div>
                {address.zipCode} {address.city}
              </div>
              <div>{address.country}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddressPage;
