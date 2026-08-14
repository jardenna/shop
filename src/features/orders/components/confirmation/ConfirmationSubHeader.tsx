import { useLanguage } from '../../../language/useLanguage';

const ConfirmationSubHeader = () => {
  const { language } = useLanguage();

  return (
    <section className="confirmation-sub-header">
      <h2>{language.orderStatusMessage}</h2>
      <p>{language.orderCancelled}</p>
    </section>
  );
};

export default ConfirmationSubHeader;
