import { Address } from '../../app/api/apiTypes/shopApiTypes';
import IconBtn from '../../components/IconBtn';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import { IconName } from '../../types/enums';
import { InputType } from '../../types/types';
import AddressInfoList from './AddressInfoList';

export type AddressFieldListProps = {
  label: string;
  name: keyof Address;
  type?: InputType;
};

const AddressPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  return (
    <>
      {isLoading && <SkeletonParagraph />}
      <p>{language.addOrManageAddress}</p>

      {profile && (
        <ul className="my-address-list">
          <li className="my-address-item">
            <div className="my-address-content">
              <IconBtn
                iconName={IconName.Add}
                title=""
                ariaLabel={language.addAddress}
                showLabel
              />
            </div>
          </li>
          {profile.addresses.map((address) => (
            <AddressInfoList
              key={address.id}
              address={address}
              username={profile.username}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default AddressPage;
