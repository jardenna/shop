import { PrimaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import { SizeVariant } from '../../types/enums';
import './_my-account.scss';
import AccountForm from './AccountForm';
import AccountInfoList from './AccountInfoList';

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  const primaryActionBtn: PrimaryActionBtnProps = {
    label: 'ok',
  };

  return (
    <>
      {isLoading && <SkeletonParagraph />}
      <p>{language.verifyAndUpdateInfo}</p>

      {profile && (
        <div className="my-account">
          <AccountInfoList profile={profile} />

          <ModalContainer
            triggerModalBtnContent={language.update}
            id="id"
            modalSize={SizeVariant.Md}
            primaryActionBtn={primaryActionBtn}
            modalHeaderText={language.temporarilyOutOfStock}
          >
            <AccountForm profile={profile} />
          </ModalContainer>
        </div>
      )}
    </>
  );
};

export default MyAccountPage;
