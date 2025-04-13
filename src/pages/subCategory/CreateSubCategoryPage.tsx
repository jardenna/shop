import PageHeader from '../../components/PageHeader';
import useLanguage from '../../features/language/useLanguage';

const CreateSubCategoryPage = () => {
  const { language } = useLanguage();

  return (
    <section className="page">
      <PageHeader heading={language.createNewCategory} />
      {/* <div className="page-card">
        <SubCategoryForm selectedCategory={null} id={null} />
      </div> */}
    </section>
  );
};

export default CreateSubCategoryPage;
