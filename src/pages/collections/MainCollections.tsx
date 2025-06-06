import useLanguage from '../../features/language/useLanguage';

const MainCollections = () => {
  const { language } = useLanguage();
  return (
    <article className="main-collection-container">
      <section className="collection-item">{language.women}</section>
      <section className="collection-item">{language.men}</section>
      <section className="collection-item">{language.kids}</section>
    </article>
  );
};

export default MainCollections;
