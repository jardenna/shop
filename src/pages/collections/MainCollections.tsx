import useLanguage from '../../features/language/useLanguage';
import { FrontPath } from '../../layout/nav/enums';
import MainCollectionsItem, {
  MainCollectionsItemProps,
} from './MainCollectionsItem';

const MainCollections = () => {
  const { language } = useLanguage();
  const mainCollectionsList: MainCollectionsItemProps[] = [
    {
      title: language.men,
      src: ['/images/collections/men.jpg'],
      linkTo: FrontPath.Men,
    },
    {
      title: language.kids,
      src: ['/images/collections/kids.jpg'],
      linkTo: FrontPath.Kids,
    },
    {
      title: language.women,
      src: [
        '/images/collections/women.jpg',
        '/images/collections/women_2.jpg',
        '/images/collections/women_3.jpg',
      ],
      linkTo: FrontPath.Women,
    },
  ];

  return (
    <div className="main-collection-container">
      {mainCollectionsList.map(({ title, src, linkTo }) => (
        <MainCollectionsItem
          key={title}
          title={title}
          src={src}
          linkTo={linkTo}
          linkText={language.discoverCollection}
        />
      ))}
    </div>
  );
};

export default MainCollections;
