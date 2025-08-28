import { ShopPath } from '../../../layout/nav/enums';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import { useGetPublishedCategoriesQuery } from '../../categories/categoriyApiSlice';
import useLanguage from '../../language/useLanguage';
import MainCollectionsItem, {
  MainCollectionsItemProps,
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

  const mainCollectionsList: MainCollectionsItemProps[] = sortedCategories.map(
    (item) => ({
      title: getlowerCaseFirstLetter(item, language),
      src: collectionImages[item],
      linkTo: ShopPath[item as keyof typeof ShopPath],
      linkText: language.discoverCollection,
    }),
  );

  return (
    <div className="main-collection-container">
      {mainCollectionsList.map(({ title, src, linkTo, linkText }) => (
        <MainCollectionsItem
          key={title}
          title={title}
          src={src}
          linkTo={linkTo}
          linkText={linkText}
        />
      ))}
    </div>
  );
};

export default MainCollections;
