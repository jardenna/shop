import { useId } from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal/Modal';
import TriggerModalButton from '../../../components/Modal/TriggerModalButton';
import { useModal } from '../../../components/Modal/useModal';
import { BtnVariant } from '../../../types/enums';

interface AdminOrderFooterProps {
  id: string;
  isLoading: boolean;
  language: Record<string, string>;
  triggerModalDisabled: boolean;
  onCancelOrder: () => void;
}

const AdminOrderFooter = ({
  language,
  id,
  isLoading,
  onCancelOrder,
  triggerModalDisabled,
}: AdminOrderFooterProps) => {
  const ariaControls = useId();
  const modalId = 'cancel-order';

  const { closeModal } = useModal();
  const handleCancelOrder = () => {
    onCancelOrder();
    closeModal();
  };

  return (
    <footer className="footer">
      <TriggerModalButton
        variant={BtnVariant.Danger}
        ariaControls={ariaControls}
        modalId={modalId}
        disabled={triggerModalDisabled}
      >
        {language.cancelOrder}
      </TriggerModalButton>
      <Modal
        ariaControls={ariaControls}
        modalId={modalId}
        headerText={language.cancelOrder}
      >
        {language.cancel} # {id}
        <footer className="footer">
          <Button variant={BtnVariant.Secondary} onClick={closeModal}>
            {language.dismiss}
          </Button>
          <Button
            variant={BtnVariant.Danger}
            onClick={handleCancelOrder}
            showBtnLoader={isLoading}
          >
            {language.cancelOrder}
          </Button>
        </footer>
      </Modal>

      <Button variant={BtnVariant.Secondary}>{language.printOrder}</Button>
    </footer>
  );
};

export default AdminOrderFooter;
