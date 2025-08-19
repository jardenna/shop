import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import type { PrimaryActionBtnProps, SecondaryActionBtnProps } from './Modal';

type ModalFooterProps = {
  primaryActionBtn: PrimaryActionBtnProps & { closeOnClick?: boolean }; // new prop
  secondaryActionBtn?: SecondaryActionBtnProps;
  onCloseModal: () => void;
};

const ModalFooter = ({
  primaryActionBtn,
  secondaryActionBtn,
  onCloseModal,
}: ModalFooterProps) => {
  const handlePrimaryClick = () => {
    if (primaryActionBtn.onClick) {
      primaryActionBtn.onClick();
    }

    if (primaryActionBtn.closeOnClick !== false) {
      onCloseModal();
    }
  };

  return (
    <LayoutElement as="footer" className="footer" ariaLabel="dialog">
      {secondaryActionBtn && (
        <Button
          onClick={secondaryActionBtn.onClick || onCloseModal}
          variant={secondaryActionBtn.variant || BtnVariant.Secondary}
        >
          {secondaryActionBtn.label}
        </Button>
      )}
      <Button
        onClick={handlePrimaryClick}
        type={primaryActionBtn.buttonType}
        disabled={primaryActionBtn.disabled}
        className={primaryActionBtn.className}
        variant={primaryActionBtn.variant || BtnVariant.Primary}
      >
        {primaryActionBtn.label}
      </Button>
    </LayoutElement>
  );
};

export default ModalFooter;
