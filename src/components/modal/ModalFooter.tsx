import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { PrimaryActionBtnProps, SecondaryActionBtnProps } from './Modal';

type modalFooterProps = {
  primaryActionBtn: PrimaryActionBtnProps;
  secondaryActionBtn?: SecondaryActionBtnProps;
  onCloseModal?: () => void;
};

const ModalFooter = ({
  primaryActionBtn,
  onCloseModal,
  secondaryActionBtn,
}: modalFooterProps) => {
  const handlePrimaryBtnClick = () => {
    if (!onCloseModal) {
      return;
    }

    if (primaryActionBtn.buttonType === 'submit') {
      onCloseModal();
    } else {
      primaryActionBtn.onClick();
      onCloseModal();
    }
  };

  return (
    <LayoutElement className="footer-buttons" ariaLabel="dialog">
      {secondaryActionBtn && (
        <Button
          onClick={secondaryActionBtn.onClick || onCloseModal}
          variant={secondaryActionBtn.variant || BtnVariant.Secondary}
        >
          {secondaryActionBtn.label}
        </Button>
      )}
      <Button
        onClick={handlePrimaryBtnClick}
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
