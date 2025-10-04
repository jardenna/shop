import { Address } from '../../app/api/apiTypes/shopApiTypes';
import IconBtn from '../../components/IconBtn';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';

import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetUserProfileQuery,
} from '../../features/profile/profileApiSlice';
import { IconName } from '../../types/enums';
import { InputType } from '../../types/types';
import handleApiError from '../../utils/handleApiError';
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
  const { onAddMessagePopup } = useMessagePopup();

  const { data: profile, isLoading } = useGetUserProfileQuery();

  const [deleteAddress] = useDeleteAddressMutation();
  const [addAddress] = useAddAddressMutation();

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress({
        addresses: id,
      }).unwrap();
      onAddMessagePopup({
        messagePopupType: 'success',
        message: language.addressDeleted,
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  const handleUpdateAddress = (id: string) => {
    console.log(id);
  };

  const HandleAddAddress = async () => {
    try {
      await addAddress({
        addresses: {
          name: 'Petras',
          street: 'Sortedamsvej 12B',
          zipCode: '2720',
          city: 'Vanløse',
        },
      }).unwrap();

      onAddMessagePopup({
        messagePopupType: 'success',
        message: 'address was created',
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
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
                onClick={HandleAddAddress}
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
