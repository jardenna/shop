import type { UserProfileResponse } from '../../app/api/apiTypes/shopApiTypes';
import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import LabelValueGrid from '../../components/LabelValueGrid';
import Popup from '../../components/popup/Popup';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import type { ProfileFieldListProps } from './MyAccountPage';

type AccountInfoListProps = {
  fallbackText: string;
  profile: UserProfileResponse;
  profileFieldList: ProfileFieldListProps[];
};

const AccountInfoList = ({
  profile,
  profileFieldList,
  fallbackText,
}: AccountInfoListProps) => {
  const { language } = useLanguage();

  const profileDateOfBirth = profile.dateOfBirth ? (
    <DateDisplay date={profile.dateOfBirth} />
  ) : (
    fallbackText
  );

  const getDisplayValue = (value: string | number | undefined) =>
    value !== undefined && value !== '' ? value : fallbackText;

  return (
    <div>
      {profileFieldList.map(({ name, label, type, tooltip }) => (
        <LabelValueGrid
          key={name}
          text={language[label]}
          tooltip={
            tooltip && (
              <Popup
                ariaControls={`${name}-info`}
                ariaLabel={language.viewInfo}
                popupContent={language.phoneInfo}
                ariaHasPopup="dialog"
              >
                <Icon iconName={IconName.Info} size="1em" />
              </Popup>
            )
          }
        >
          {type === 'date'
            ? profileDateOfBirth
            : getDisplayValue(profile[name])}
        </LabelValueGrid>
      ))}

      <LabelValueGrid text={language.fashionPreference}>
        {language[profile.preferredFashion]}
      </LabelValueGrid>
    </div>
  );
};

export default AccountInfoList;
