import { Address } from '../../app/api/apiTypes/shopApiTypes';
import IconBtn from '../../components/IconBtn';
import IconContent from '../../components/IconContent';
import { PrimaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import { BtnVariant, IconName } from '../../types/enums';
import { InputType } from '../../types/types';
import AddressInfoListContent from './AddressInfoListContent';

export type AddressFieldListProps = {
  label: string;
  name: keyof Address;
  type?: InputType;
};

const AddressPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: () => {
      console.log(123);
    },
    label: language.delete,
    variant: BtnVariant.Danger,
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
                <ModalContainer
                  triggerModalBtnContent={
                    <IconContent
                      iconName={IconName.Trash}
                      title=""
                      ariaLabel={language.deleteAddress}
                    />
                  }
                  triggerModalBtnVariant={BtnVariant.Ghost}
                  id={address.id}
                  primaryActionBtn={primaryActionBtn}
                  modalHeaderText={language.deleteAddress}
                >
                  {language.sureToDelete} {address.street}
                </ModalContainer>
                <IconBtn
                  iconName={IconName.Pencil}
                  title=""
                  ariaLabel={language.update}
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
