import { useParams } from 'react-router';
import TopContainer from '../../components/TopContainer';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';

const ViewSubCategoryPage = () => {
  const { language } = useLanguage();
  const params = useParams();

  console.log(params.id);

  return (
    <section className="page">
      <TopContainer
        heading={language.categories}
        linkText={language.createNewCategory}
        linkTo={`/admin/${MainPath.AdminCategoryCreate}`}
      />
      <div className="page-card">sub cat</div>
    </section>
  );
};

export default ViewSubCategoryPage;
