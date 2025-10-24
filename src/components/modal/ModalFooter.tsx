import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { PrimaryActionBtnProps } from './Modal';

type SecondaryBtnProps = {
  label: string;
  variant: BtnVariant;
  onClick: () => void;
};

type ModalFooterProps = {
  ariaLabel: string;
  primaryActionBtn: PrimaryActionBtnProps;
  secondaryBtn: SecondaryBtnProps | null;
  onCloseModal: () => void;
  onPrimaryClick?: () => void;
};

const ModalFooter = ({
  primaryActionBtn,
  onCloseModal,
  onPrimaryClick,
  ariaLabel,
  secondaryBtn,
}: ModalFooterProps) => (
  <LayoutElement as="footer" className="footer" ariaLabel={ariaLabel}>
    {secondaryBtn && (
      <Button variant={secondaryBtn.variant} onClick={onCloseModal}>
        {secondaryBtn.label}
      </Button>
    )}
    <Button
      onClick={onPrimaryClick}
      type={primaryActionBtn.buttonType}
      disabled={primaryActionBtn.disabled}
      showBtnLoader={primaryActionBtn.showBtnLoader}
      className={primaryActionBtn.className}
      variant={primaryActionBtn.variant || BtnVariant.Primary}
    >
      {primaryActionBtn.label}
    </Button>
  </LayoutElement>
);

export default ModalFooter;
