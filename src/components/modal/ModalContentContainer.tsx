import type { ReactNode } from 'react';

const ModalContentContainer = ({
  isForm,
  onSubmit,
  children,
}: {
  children: ReactNode;
  isForm: boolean;
  onSubmit?: () => void;
}) =>
  isForm ? (
    <form
      noValidate
      className="modal-form modal-content"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      {children}
    </form>
  ) : (
    <div className="modal-content">{children}</div>
  );

export default ModalContentContainer;
