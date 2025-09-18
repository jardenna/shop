import { ReactNode } from 'react';
import MoreLink from '../../../components/MoreLink';

type FashionGridItemProps = {
  children: ReactNode;
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
  children,
  heading,
  linkTo,
  linkText,
  subHading,
  backgroundImageName = 'sale',
  text,
}: FashionGridItemProps) => (
  <section className={`fashion-grid-item image-background ${className}`}>
    <picture>
      <source
        srcSet={`/images/home/${backgroundImageName}.avif`}
        type="image/avif"
      />
      <img
        className="img-fallback"
        src={`/images/home/${backgroundImageName}.png`}
        alt="alt"
        loading="lazy"
      />
    </picture>
    <div className="fashion-grid-text">
      <h2>{heading}</h2>
      {subHading && <h3>{subHading}</h3>}
      <p>{text}</p>
      <MoreLink linkText={linkText} linkTo={linkTo} />
      {children}
    </div>
  </section>
);

export default FashionGridItem;
