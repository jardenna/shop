export type DeleteAddressModalProps = {
  id: string;
  modalId: string | null;
  modalMessage?: string;
};

const DeleteAddressModal = ({
  modalId,
  id,
  modalMessage,
}: DeleteAddressModalProps) => {
  // const { language } = useLanguage();
  console.log(modalId, id, modalMessage);

  return <section>ee</section>;
};

export default DeleteAddressModal;
