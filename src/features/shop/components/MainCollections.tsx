import { ShopPath } from '../../../layout/nav/enums';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import { useGetPublishedCategoriesQuery } from '../../categories/categoriyApiSlice';
import useLanguage from '../../language/useLanguage';
import MainCollectionsItem, {
  MainCollectionsBaseProps,
} from './MainCollectionsItem';

type MainCollectionsProps = {
  categoryOrder: string[];
  collectionImages: Record<string, string[]>;
};
const MainCollections = ({
  collectionImages,
  categoryOrder,
}: MainCollectionsProps) => {
  const { language } = useLanguage();

  const { data: publishedCategories } = useGetPublishedCategoriesQuery();

  const sortedCategories = (
    publishedCategories?.length ? [...publishedCategories] : ['Women']
  ).sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));

  const mainCollectionsList: MainCollectionsBaseProps[] = sortedCategories.map(
    (item) => ({
      title: getlowerCaseFirstLetter(item, language),
      imgList: collectionImages[item],
      linkTo: ShopPath[item as keyof typeof ShopPath],
      linkText: language.discoverCollection,
    }),
  );

  return (
    <div className="main-collection-container">
      {mainCollectionsList.map(({ title, imgList, linkTo, linkText }) => (
        <MainCollectionsItem
          key={title}
          imgPath="/images/adImages"
          title={title}
          imgList={imgList}
          linkTo={linkTo}
          linkText={linkText}
        />
      ))}
    </div>
  );
};

export default MainCollections;
