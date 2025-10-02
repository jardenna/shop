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
        <ul className="my-address-list ">
          {profile.addresses.map((address) => (
            <li key={address.id} className="my-address-item">
              <p className="my-address-title">
                {address.name || profile.username}
              </p>
              <div>{address.street}</div>

              <div>
                {address.zipCode} {address.city}
              </div>
              <div>{address.country}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AddressPage;
