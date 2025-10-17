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

  type ProfileProps = {
    fallbackInfo: string;
    value: string | number | undefined;
    type?: string;
  };

  const getProfileValue = ({ fallbackInfo, value, type }: ProfileProps) => {
    if (type === 'date') {
      return value ? <DateDisplay date={String(value)} /> : fallbackInfo;
    }
    return value !== undefined && value !== '' ? value : fallbackInfo;
  };

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
          {getProfileValue({
            value: profile[name],
            fallbackInfo: language.notProvided,
            type,
          })}
        </LabelValueGrid>
      ))}

      <LabelValueGrid text={language.fashionPreference}>
        {language[profile.preferredFashion]}
      </LabelValueGrid>
    </div>
  );
};

export default AccountInfoList;
