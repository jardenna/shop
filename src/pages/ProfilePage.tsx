import ModalContainer from '../components/modal/ModalContainer';
import useLanguage from '../features/language/useLanguage';
import { BtnVariant, SizeVariant } from '../types/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const ProfilePage = () => {
  const { language } = useLanguage();

  const primaryActionBtn = {
    onClick: () => {
      console.log(12);
    },
    label: 'Test',
  };

  // const primaryActionBtn = {
  //   onclick: () => {
  //     console.log(12);
  //   },
  //   label: 'Test',
  // };

  return (
    <MainPageContainer heading={language.profile}>
      <section>
        {language.profile}
        <ModalContainer
          triggerModalBtnContent="Notify me when missing sizes are back in stock"
          triggerModalBtnVariant={BtnVariant.Ghost}
          id="sizes"
          primaryActionBtn={primaryActionBtn}
          modalSize={SizeVariant.Sm}
          modalHeaderText={`${language.size}  ${language.currentlyUnavailable}`}
        >
          Helloo
        </ModalContainer>
      </section>
    </MainPageContainer>
  );
};

export default ProfilePage;
