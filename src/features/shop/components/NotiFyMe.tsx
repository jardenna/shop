import useLanguage from '../../language/useLanguage';

const NotiFyMe = () => {
  const { language } = useLanguage();
  return (
    <section>
      <p>{language.getNotifiedForProducts}</p>
      <div>size multiChoise list</div>

      <div>email form</div>
    </section>
  );
};

export default NotiFyMe;
