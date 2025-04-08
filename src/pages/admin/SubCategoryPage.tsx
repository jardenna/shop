import TopContainer from '../../components/TopContainer';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';

const SubCategoryPage = () => {
  const { language } = useLanguage();

  return (
    <section className="sub-category-page">
      <TopContainer
        heading={language.subCategories}
        linkText={language.addSubCategory}
        linkTo={`/admin/${MainPath.AdminSubCategoryCreate}`}
      />
    </section>
  );
};

export default SubCategoryPage;
