type FormErrorProps = {
  errorText: string;
  ariaErrorId?: string;
  role?: string;
};

const FormError = ({ errorText, ariaErrorId, role }: FormErrorProps) => (
  <span id={ariaErrorId} className="error-message" role={role}>
    {errorText}
  </span>
);

export default FormError;
