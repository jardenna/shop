import useLanguage from '../../features/language/useLanguage';
import { ShopPath } from '../../layout/nav/enums';
import MainCollectionsItem, {
  MainCollectionsItemProps,
} from './MainCollectionsItem';

const MainCollections = () => {
  const { language } = useLanguage();
  const mainCollectionsList: MainCollectionsItemProps[] = [
    {
      title: language.men,
      src: ['/images/collections/men.jpg'],
      linkTo: ShopPath.Men,
      linkText: language.discoverCollection,
    },
    {
      title: language.kids,
      src: ['/images/collections/kids.jpg'],
      linkTo: ShopPath.Kids,
      linkText: language.discoverCollection,
    },
    {
      title: language.women,
      src: [
        '/images/collections/women.jpg',
        '/images/collections/women_2.jpg',
        '/images/collections/women_3.jpg',
      ],
      linkTo: ShopPath.Women,
      linkText: language.discoverCollection,
    },
  ];

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
