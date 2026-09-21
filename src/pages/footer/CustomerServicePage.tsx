import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/Button';
import Dialog from '../../components/dialog/Dialog';
import { useDialog } from '../../components/dialog/useDialog';
import { openModal } from '../../components/popModal/popModalSlice';
import { selectModalId, toggleModal } from '../../features/modalSlice';
import MainPageContainer from '../pageContainer/MainPageContainer';

const CustomerServicePage = () => {
  const dispatch = useAppDispatch();
  const modalId = useAppSelector(selectModalId);

  const handleOpenModal = () => {
    dispatch(toggleModal('size'));
  };

  const handleCloseModal = () => {
    dispatch(toggleModal(null));
  };

  const { closeModal, handleAnimationEnd, isMounted, popupClass, popupRef } =
    useDialog({
      isOpen: modalId === 'size',
      onClose: handleCloseModal,
    });

  const handleOpenPopM = () => {
    dispatch(openModal());
  };
  return (
    <MainPageContainer heading="customer" className="general-page">
      <Button onClick={handleOpenPopM}>open</Button>
      <div className="size-guide-btn">
        <Button
          onClick={handleOpenModal}
          ariaControls="ariaControlsId"
          ariaHasPopup="dialog"
        >
          Open modal
        </Button>
      </div>

      <Dialog
        ariaControlsId="ariaControlsId"
        isMounted={isMounted}
        modalSize="small"
        onAnimationEnd={handleAnimationEnd}
        onErrorBoundaryReset={closeModal}
        popupClass={popupClass}
        popupRef={popupRef}
      >
        <p>Test modal</p>

        <Button type="button" onClick={closeModal}>
          Close
        </Button>
      </Dialog>
    </MainPageContainer>
  );
};

export default CustomerServicePage;
