import { Address } from '../../app/api/apiTypes/shopApiTypes';
import IconBtn from '../../components/IconBtn';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import { IconName } from '../../types/enums';
import { InputType } from '../../types/types';
import AddressInfoListContent from './AddressInfoListContent';
import DeleteAddressModal from './DeleteAddressModal';
import UpdateAddressModal from './UpdateAddressModal';

export type AddressFieldListProps = {
  label: string;
  name: keyof Address;
  type?: InputType;
};

const AddressPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  const handleDeleteAddress = (id: string) => {
    console.log(id);
  };

  const handleUpdateAddress = (id: string) => {
    console.log(id);
  };

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
            <li key={address.id} className="my-address-item">
              <AddressInfoListContent
                address={address}
                username={profile.username}
              />
              <div className="my-address-footer">
                <DeleteAddressModal
                  id={address.id}
                  modalMessage={address.street}
                  onDeleteAddress={handleDeleteAddress}
                />
                <UpdateAddressModal
                  id={address.id}
                  modalMessage={address.street}
                  onUpdateAddress={handleUpdateAddress}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AddressPage;
