import { PrimaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import './_my-account.scss';
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
            primaryActionBtn={primaryActionBtn}
            modalHeaderText={language.temporarilyOutOfStock}
          >
            modal
          </ModalContainer>
        </div>
      )}
    </>
  );
};

export default MyAccountPage;
