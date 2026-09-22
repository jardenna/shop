interface FormModalProps {
  id: string;
}

const FormModal = ({ id }: FormModalProps) => {
  console.log(id);

  return <section>{id}</section>;
};

export default FormModal;
