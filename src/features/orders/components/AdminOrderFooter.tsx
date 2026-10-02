import { useId } from 'react';
import { OrderResponse } from '../../../app/api/apiTypes/orderApiTypes';
import Button from '../../../components/Button';
import DownloadPdfBtn from '../../../components/DownloadPdfBtn';
import Modal from '../../../components/Modal/Modal';
import TriggerModalButton from '../../../components/Modal/TriggerModalButton';
import { useModal } from '../../../components/Modal/useModal';
import PrintAdminOrder from '../../../components/print/PrintAdminOrder';
import { BtnVariant } from '../../../types/enums';
import { useCurrency } from '../../currency/useCurrency';
import { useLanguage } from '../../language/useLanguage';

interface AdminOrderFooterProps {
  isLoading: boolean;
  order: OrderResponse;
  triggerModalDisabled: boolean;
  onCancelOrder: () => void;
}

const AdminOrderFooter = ({
  isLoading,
  onCancelOrder,
  order,
  triggerModalDisabled,
}: AdminOrderFooterProps) => {
  const ariaControls = useId();
  const modalId = 'cancel-order';

  const { closeModal } = useModal();
  const handleCancelOrder = () => {
    onCancelOrder();
    closeModal();
  };

  const { selectedLanguage, language } = useLanguage();
  const { rates } = useCurrency();

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
        {language.cancel} # {order.id}
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
      <DownloadPdfBtn
        document={
          <PrintAdminOrder
            order={order}
            selectedLanguage={selectedLanguage}
            language={language}
            rates={rates}
          />
        }
        fileName={`order-${order.id}.pdf`}
        label={language.printOrder}
      />
    </footer>
  );
};

export default AdminOrderFooter;
