import Modal, { PrimaryActionBtnProps } from '../modal/Modal';

interface SizeGuideModalProps {
  id: string;
  language: Record<string, string>;
}

const SizeGuideModal = ({ language, id }: SizeGuideModalProps) => {
  const primaryActionBtn: PrimaryActionBtnProps = {
    label: language.update,
  };

  return (
    <Modal
      id={id}
      modalSize="medium"
      primaryActionBtn={primaryActionBtn}
      modalHeaderText={language.sizeGuide}
    >
      hello
    </Modal>
  );
};

export default SizeGuideModal;
