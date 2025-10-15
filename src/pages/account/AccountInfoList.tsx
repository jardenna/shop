import type { UserProfileResponse } from '../../app/api/apiTypes/shopApiTypes';
import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import LabelValueGrid from '../../components/LabelValueGrid';
import Popup from '../../components/popup/Popup';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import type { ProfileFieldListProps } from './MyAccountPage';

type AccountInfoListProps = {
  profile: UserProfileResponse;
  profileFieldList: ProfileFieldListProps[];
};

const AccountInfoList = ({
  profile,
  profileFieldList,
}: AccountInfoListProps) => {
  const { language } = useLanguage();

  const profileDateOfBirth = profile.dateOfBirth ? (
    <DateDisplay date={profile.dateOfBirth} />
  ) : (
    language.notProvided
  );

  return (
    <div>
      {profileFieldList.map(({ name, label, type, tooltip }) => (
        <LabelValueGrid
          key={name}
          text={language[label]}
          tooltip={
            tooltip && (
              <Popup
                ariaControls="phone"
                ariaLabel={language.viewInfo}
                popupContent={language.phoneInfo}
                ariaHasPopup="dialog"
              >
                <Icon iconName={IconName.Info} title="" size="1em" />
              </Popup>
            )
          }
        >
          {type === 'date' ? profileDateOfBirth : profile[name]}
        </LabelValueGrid>
      ))}

      <LabelValueGrid text={language.fashionPreference}>
        {language[profile.preferredFashion]}
      </LabelValueGrid>
    </div>
  );
};

export default AccountInfoList;
