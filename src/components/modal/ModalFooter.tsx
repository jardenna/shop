import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import type { ModalActionBtns } from './Modal';

type ModalFooterProps = ModalActionBtns & {
  ariaLabel: string;
  onCloseModal: () => void;
  onPrimaryClick?: () => void;
};

const ModalFooter = ({
  primaryActionBtn,
  secondaryActionBtn,
  onCloseModal,
  onPrimaryClick,
  ariaLabel,
}: ModalFooterProps) => {
  const { language } = useLanguage();

  return (
    <LayoutElement as="footer" className="footer" ariaLabel={ariaLabel}>
      {secondaryActionBtn && (
        <Button
          onClick={onCloseModal}
          variant={secondaryActionBtn.variant || BtnVariant.Secondary}
        >
          {secondaryActionBtn.label || language.cancel}
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
};

export default ModalFooter;
