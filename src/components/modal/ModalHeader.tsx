import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import BtnClose from '../BtnClose';

type ModalHeaderProps = {
  ariaLabel: string;
  modalHeadertext: string;
  showCloseIcon?: boolean;
  onCloseModal: () => void;
};

const ModalHeader = ({
  modalHeadertext,
  onCloseModal,
  showCloseIcon,
  ariaLabel,
}: ModalHeaderProps) => {
  const { language } = useLanguage();
  return (
    <LayoutElement className="modal-header" ariaLabel={ariaLabel}>
      <h2 className="modal-title" id="modal-title">
        {modalHeadertext}
      </h2>
      {showCloseIcon && (
        <BtnClose onClick={onCloseModal} ariaLabel={language.closeDialog} />
      )}
    </LayoutElement>
  );
};

export default ModalHeader;
