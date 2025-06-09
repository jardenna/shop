import Img from '../../../components/Img';

type SubNavAdProps = {
  alt: string;
  heading: string;
  src: string;
};

const SubNavAd = ({ src, alt, heading }: SubNavAdProps) => (
  <>
    <Img src={src} alt={alt} />
    <div>
      <h2>{heading}.</h2>
    </div>
  </>
);

export default SubNavAd;
