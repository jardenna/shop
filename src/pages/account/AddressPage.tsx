import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Skeleton from '../../components/skeleton/Skeleton';
import SkeletonCardList from '../../components/skeleton/SkeletonCardList';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteAddressMutation,
  useGetUserProfileQuery,
} from '../../features/profile/profileApiSlice';
import handleApiError from '../../utils/handleApiError';
import AddressFormModal from './AddressFormModal';
import AddressInfoListContent from './AddressInfoListContent';
import DeleteAddressModal from './DeleteAddressModal';

const AddressPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { data: profile, isLoading } = useGetUserProfileQuery();
  const [deleteAddress] = useDeleteAddressMutation();

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress({
        address: id,
      }).unwrap();
      onAddMessagePopup({
        message: language.addressDeleted,
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  return (
    <>
      <p>{language.addOrManageAddress}</p>
      {isLoading && (
        <SkeletonCardList count={3} className="small-card">
          <Skeleton />
        </SkeletonCardList>
      )}

      {profile && (
        <ul className="my-address-list">
          <li className="my-address-item add-address">
            <AddressFormModal
              id={null}
              username={profile.username}
              modalHeaderText={language.createNewAddress}
              primaryActionBtnLabel={language.createNewAddress}
              popupMessage={language.addressCreated}
              triggerModalDisabled={profile.addresses.length === 4}
            />
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
                <AddressFormModal
                  id={address.id}
                  address={address}
                  username={profile.username}
                  modalHeaderText={language.updateAddress}
                  primaryActionBtnLabel={language.update}
                  popupMessage={language.addressUpdated}
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
