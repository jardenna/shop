import { useLanguage } from '../../features/language/useLanguage';
import BtnClose from '../BtnClose';

type ModalHeaderProps = {
  id: string;
  modalHeadertext: string;
  showCloseIcon?: boolean;
  onCloseModal: () => void;
};

const ModalHeader = ({
  modalHeadertext,
  onCloseModal,
  showCloseIcon,
  id,
}: ModalHeaderProps) => {
  const { language } = useLanguage();
  return (
    <header className="modal-header">
      <h2 className="modal-title" id={id}>
        {modalHeadertext}
      </h2>
      {showCloseIcon && (
        <BtnClose onClick={onCloseModal} ariaLabel={language.closeDialog} />
      )}
    </header>
  );
};

export default ModalHeader;
