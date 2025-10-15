import ImageBackground from '../../../components/imageBackground/ImageBackground';
import MoreLink from '../../../components/MoreLink';

type FashionGridItemProps = {
  alt: string;
  ariaLabelledby: string;
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
  ariaLabelledby,
}: FashionGridItemProps) => (
  <ImageBackground
    as="article"
    className={`fashion-grid-item  ${className}`}
    srcSet={`/images/home/${backgroundImageName}.avif`}
    src={`/images/home/${backgroundImageName}.png`}
    alt={alt}
    ariaLabelledby={ariaLabelledby}
  >
    <div className="fashion-grid-content">
      <div className="fashion-grid-text">
        <h2 id={ariaLabelledby}>{heading}</h2>
        {subHading && <h3>{subHading}</h3>}
        <p>{text}</p>
        <MoreLink linkText={linkText} linkTo={linkTo} />
      </div>
    </div>
  </ImageBackground>
);

export default FashionGridItem;
