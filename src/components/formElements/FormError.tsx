type FormErrorProps = {
  errorText: string;
  ariaErrorId?: string;
};

const FormError = ({ errorText, ariaErrorId }: FormErrorProps) => (
  <span id={ariaErrorId} className="error-message">
    {errorText}
  </span>
);

export default FormError;
