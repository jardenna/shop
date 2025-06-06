import useLanguage from '../../features/language/useLanguage';

const MainCollections = () => {
  const { language } = useLanguage();
  return (
    <article className="collections">
      <section className="collection-item">{language.woman}</section>
      <section className="collection-item">Men</section>
      <section className="collection-item">Kids</section>
    </article>
  );
};

export default MainCollections;
