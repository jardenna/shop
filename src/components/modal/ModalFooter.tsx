import { FC } from 'react';
import LayoutElement from '../../layout/LayoutElement';
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
      <Button
        onClick={handlePrimaryBtnClick}
        type={primaryActionBtn.buttonType}
        className={primaryActionBtn.className || 'btn-danger'}
      >
        {primaryActionBtn.label}
      </Button>
      {secondaryActionBtn && (
        <Button
          onClick={secondaryActionBtn.onClick || onCloseModal}
          variant={secondaryActionBtn.variant}
        >
          {secondaryActionBtn.label}
        </Button>
      )}
    </LayoutElement>
  );
};

export default ModalFooter;
