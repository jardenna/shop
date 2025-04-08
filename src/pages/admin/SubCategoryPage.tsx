import TopContainer from '../../components/TopContainer';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';

const SubCategoryPage = () => {
  const { language } = useLanguage();

  return (
    <section className="page">
      <TopContainer
        heading={language.subCategories}
        linkText={language.addSubCategory}
        linkTo={`/admin/${MainPath.AdminSubCategoryCreate}`}
      />
      <div className="page-card">HELLEs</div>
    </section>
  );
};

export default SubCategoryPage;
