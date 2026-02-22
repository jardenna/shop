import { MainCategoryNames } from '../app/api/apiTypes/sharedApiTypes';
import { useGetPublishedCategoriesQuery } from '../features/categories/categoriyApiSlice';
import useLanguage from '../features/language/useLanguage';
import MainCollections from '../features/shop/components/MainCollections';

import { MainCollectionsBaseProps } from '../features/shop/components/MainCollectionsItem';
import { ShopPath } from '../layout/nav/enums';
import { translateKey } from '../utils/utils';
import './MainCollectionPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

type AdImages = Partial<Record<MainCategoryNames, string[]>> & {
  [key: string]: string[];
};

const CollectionLandingPage = () => {
  const { language } = useLanguage();

  const collectionImages: AdImages = {
    Women: ['women', 'women_2', 'women_3'],
    Men: ['men'],
    Kids: ['kids'],
  };

  const categoryOrder = ['Kids', 'Men', 'Women'];

  const {
    data: publishedCategories,
    isLoading,
    refetch,
  } = useGetPublishedCategoriesQuery();

  const sortedCategories = (
    publishedCategories?.length ? [...publishedCategories] : ['Women']
  ).sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));

  const mainCollectionList: MainCollectionsBaseProps[] = sortedCategories.map(
    (item) => ({
      title: translateKey(item, language),
      imgList: collectionImages[item],
      linkTo: ShopPath[item as keyof typeof ShopPath],
      linkText: language.discoverCollection,
    }),
  );

  return (
    <MainPageContainer heading="collection">
      <MainCollections
        mainCollectionList={mainCollectionList}
        onReset={refetch}
        isLoading={isLoading}
      />
    </MainPageContainer>
  );
};

export default CollectionLandingPage;
