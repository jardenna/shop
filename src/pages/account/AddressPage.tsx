import { Address } from '../../app/api/apiTypes/shopApiTypes';
import IconBtn from '../../components/IconBtn';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import { IconName } from '../../types/enums';
import { InputType } from '../../types/types';

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
          {profile.addresses.map((address) => (
            <li key={address.id} className="my-address-item">
              <div className="my-address-content">
                <p className="my-address-title">
                  {address.name || profile.username}
                </p>
                <p>{address.street}</p>
                <p>
                  {address.zipCode} {address.city}
                </p>
                <p>{address.country}</p>
              </div>
              <div className="my-address-footer">
                <IconBtn
                  iconName={IconName.Trash}
                  title=""
                  ariaLabel={language.delete}
                />
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
