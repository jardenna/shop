import MainCollectionsItem, {
  MainCollectionsBaseProps,
} from './MainCollectionsItem';

type MainCollectionsProps = {
  mainCollectionList: MainCollectionsBaseProps[];
};
const MainCollections = ({ mainCollectionList }: MainCollectionsProps) => (
  <div className="main-collection-container">
    {mainCollectionList.map(({ title, imgList, linkTo, linkText }) => (
      <MainCollectionsItem
        key={title}
        imgPath="/images"
        title={title}
        imgList={imgList}
        linkTo={linkTo}
        linkText={linkText}
      />
    ))}
  </div>
);

export default MainCollections;
