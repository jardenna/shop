import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/Button';
import Modal from '../../components/modal/Modal';
import { useLanguage } from '../../features/language/useLanguage';
import { selectModalId, toggleModal } from '../../features/modalSlice';
import { BtnVariant } from '../../types/enums';
import MainPageContainer from '../pageContainer/MainPageContainer';

const CustomerServicePage = () => {
  const { language } = useLanguage();
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    dispatch(toggleModal('sixe'));
  };

  const modalId = useAppSelector(selectModalId);

  return (
    <MainPageContainer heading="customer" className="general-page">
      <div className="size-guide-btn">
        <Button
          variant={BtnVariant.Ghost}
          onClick={handleOpenModal}
          ariaControls="ariaControlsId"
          ariaHasPopup="dialog"
        >
          {language.sizeGuide}
        </Button>
      </div>

      {modalId && (
        <Modal
          id={modalId}
          modalSize="medium"
          primaryActionBtn={{
            label: 'OK',
          }}
          modalHeaderText={language.sizeGuide}
        >
          test modal
        </Modal>
      )}
    </MainPageContainer>
  );
};

export default CustomerServicePage;
