import useLanguage from '../../features/language/useLanguage';
import MainCollectionsItem from './MainCollectionsItem';

const MainCollections = () => {
  const { language } = useLanguage();
  const mainCollectionsList = [
    { title: language.men, src: ['/images/collections/men.jpg'] },
    { title: language.kids, src: ['/images/collections/kids.jpg'] },
    {
      title: language.women,
      src: [
        '/images/collections/women.jpg',
        '/images/collections/women_2.jpg',
        '/images/collections/women_3.jpg',
      ],
    },
  ];

  return (
    <article className="main-collection-container">
      {mainCollectionsList.map(({ title, src }) => (
        <MainCollectionsItem key={title} title={title} src={src} />
      ))}
    </article>
  );
};

export default MainCollections;
