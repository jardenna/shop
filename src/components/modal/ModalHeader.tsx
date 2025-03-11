import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import BtnClose from '../BtnClose';

interface ModalHeaderProps {
  modalHeadertext: string;
  showCloseIcon?: boolean;
  onCloseModal: () => void;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  modalHeadertext,
  onCloseModal,
  showCloseIcon,
}) => {
  const { language } = useLanguage();
  return (
    <LayoutElement as="header" className="modal-header" ariaLabel="Dialog">
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
