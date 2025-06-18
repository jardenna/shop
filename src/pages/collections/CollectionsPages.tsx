import { useParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';
import './_collection-page.scss';

const CollectionsPages = () => {
  const { language } = useLanguage();
  const { category } = useParams();
  console.log(category);
  return (
    <MainPageContainer heading={language.collection}>
      {category}
    </MainPageContainer>
  );
};

export default CollectionsPages;
