import type { ReactNode } from 'react';
import type { FormEventType } from '../../types/types';

const ModalBodyWrapper = ({
  isForm,
  onSubmit,
  children,
}: {
  children: ReactNode;
  isForm: boolean;
  onSubmit?: (event: FormEventType) => void;
}) =>
  isForm ? (
    <form noValidate className="modal-form modal-content" onSubmit={onSubmit}>
      {children}
    </form>
  ) : (
    <div className="modal-content">{children}</div>
  );

export default ModalBodyWrapper;
