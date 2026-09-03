import { useLanguage } from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const SalesPage = () => {
  const { language } = useLanguage();

  // if (!products) {
  //   return <SkeletonCollectionPage count={4} />;
  // }

  return (
    <MainPageContainer heading={language.sale}>
      <div>sale</div>
    </MainPageContainer>
  );
};

export default SalesPage;
