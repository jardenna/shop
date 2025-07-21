import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import BtnClose from '../BtnClose';

type ModalHeaderProps = {
  modalHeadertext: string;
  showCloseIcon?: boolean;
  onCloseModal: () => void;
};

const ModalHeader = ({
  modalHeadertext,
  onCloseModal,
  showCloseIcon,
}: ModalHeaderProps) => {
  const { language } = useLanguage();
  return (
    <LayoutElement className="modal-header" ariaLabel="Dialog">
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
