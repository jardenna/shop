import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Skeleton from '../../components/skeleton/Skeleton';
import SkeletonCardList from '../../components/skeleton/SkeletonCardList';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import AddressFormModal from './AddressFormModal';
import AddressInfoListContent from './AddressInfoListContent';
import DeleteAddressModal from './DeleteAddressModal';

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
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={() => refetch}
        >
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
        </ErrorBoundary>
      )}
    </>
  );
};

export default AddressPage;
