import { FC } from 'react';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { PrimaryActionBtnProps, SecondaryActionBtnProps } from './Modal';

interface modalFooterProps {
  primaryActionBtn: PrimaryActionBtnProps;
  secondaryActionBtn?: SecondaryActionBtnProps;
  onCloseModal?: () => void;
}

const ModalFooter: FC<modalFooterProps> = ({
  primaryActionBtn,
  onCloseModal,
  secondaryActionBtn,
}) => {
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
    <LayoutElement className="modal-footer" ariaLabel="dialog">
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
        className={primaryActionBtn.className}
        variant={primaryActionBtn.variant || BtnVariant.Primary}
      >
        {primaryActionBtn.label}
      </Button>
    </LayoutElement>
  );
};

export default ModalFooter;
