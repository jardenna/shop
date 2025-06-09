import Button from '../../components/Button';
import Img from '../../components/Img';

type MainCollectionsItemProps = {
  src: string[];
  title: string;
};

const MainCollectionsItem = ({ title, src }: MainCollectionsItemProps) => (
  <section className="collections-item">
    <div className="collections-content">
      <h2 className="collections-title">{title}</h2>

      <Button>Se kollektion</Button>
    </div>
    <div className="collections-img-container">
      {src.map((s) => (
        <Img key={s} className="collections-img" src={s} alt="" />
      ))}
    </div>
  </section>
);

export default MainCollectionsItem;
