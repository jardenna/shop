import Button from '../../../components/Button';
import { PrimaryActionBtnProps } from '../../../components/modal/Modal';
import ModalContainer from '../../../components/modal/ModalContainer';
import { BtnVariant } from '../../../types/enums';

interface AdminOrderFooterProps {
  id: string;
  language: Record<string, string>;
  triggerModalDisabled: boolean;
  onCancelOrder: () => void;
}

const AdminOrderFooter = ({
  language,
  id,
  onCancelOrder,
  triggerModalDisabled,
}: AdminOrderFooterProps) => {
  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: onCancelOrder,
    label: language.cancelOrder,
    variant: BtnVariant.Danger,
  };

  return (
    <footer className="footer">
      <ModalContainer
        triggerModalBtnContent={language.cancelOrder}
        triggerModalBtnVariant={BtnVariant.Danger}
        secondaryActionBtnLabel={language.dismiss}
        id={id}
        primaryActionBtn={primaryActionBtn}
        modalHeaderText={language.cancelOrder}
        triggerModalDisabled={triggerModalDisabled}
      >
        {language.cancel} # {id}
      </ModalContainer>
      <Button variant={BtnVariant.Secondary}>{language.printOrder}</Button>
    </footer>
  );
};

export default AdminOrderFooter;
