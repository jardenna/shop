import { useLanguage } from '../../language/useLanguage';

const ConfirmationSubHeader = () => {
  const { language } = useLanguage();

  return (
    <section>
      <h2>{language.orderConfirmationDescription}</h2>
      <p>{language.orderConfirmationProcessing}</p>
    </section>
  );
};

export default ConfirmationSubHeader;
