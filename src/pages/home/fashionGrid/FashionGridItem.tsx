import ImageBackground from '../../../components/imageBackground/ImageBackground';
import MoreLink from '../../../components/MoreLink';

type FashionGridItemProps = {
  alt: string;
  className: string;
  heading: string;
  linkText: string;
  linkTo: string;
  text: string;
  backgroundImageName?: string;
  subHading?: string;
};

const FashionGridItem = ({
  className,
  heading,
  linkTo,
  linkText,
  subHading,
  backgroundImageName = 'sale',
  text,
  alt,
}: FashionGridItemProps) => (
  <ImageBackground
    className={`fashion-grid-item  ${className}`}
    srcSet={`/images/home/${backgroundImageName}.avif`}
    src={`/images/home/${backgroundImageName}.png`}
    alt={alt}
  >
    <div className="fashion-grid-content">
      <div className="fashion-grid-text">
        <h2>{heading}</h2>
        {subHading && <h3>{subHading}</h3>}
        <p>{text}</p>
        <MoreLink linkText={linkText} linkTo={linkTo} />
      </div>
    </div>
  </ImageBackground>
);

export default FashionGridItem;
