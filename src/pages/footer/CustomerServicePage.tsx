import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/Button';
import Dialog from '../../components/dialog/Dialog';
import { selectModalId, toggleModal } from '../../features/modalSlice';
import MainPageContainer from '../pageContainer/MainPageContainer';

const CustomerServicePage = () => {
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    dispatch(toggleModal('sixe'));
  };

  const modalId = useAppSelector(selectModalId);

  return (
    <MainPageContainer heading="customer" className="general-page">
      <div className="size-guide-btn">
        <Button
          onClick={handleOpenModal}
          ariaControls="ariaControlsId"
          ariaHasPopup="dialog"
        >
          Open modal
        </Button>
      </div>

      {modalId && <Dialog id={modalId}>Test modal</Dialog>}
    </MainPageContainer>
  );
};

export default CustomerServicePage;
