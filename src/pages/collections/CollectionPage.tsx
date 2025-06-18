import { useParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';
import './_collection-page.scss';

const CollectionPage = () => {
  const { language } = useLanguage();
  const { category } = useParams();
  console.log(category);

  return (
    <MainPageContainer heading={language.collection}>
      {category} Collection page
    </MainPageContainer>
  );
};

export default CollectionPage;
