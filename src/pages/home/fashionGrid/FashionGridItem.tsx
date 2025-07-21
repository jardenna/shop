import { ReactNode } from 'react';
import MoreLink from '../../../components/MoreLink';

type FashionGridItemProps = {
  children: ReactNode;
  className: string;
  heading: string;
  linkText: string;
  linkTo: string;
  subHading?: string;
};

const FashionGridItem = ({
  className,
  children,
  heading,
  linkTo,
  linkText,
  subHading,
}: FashionGridItemProps) => (
  <section className={`fashion-grid-item ${className}`}>
    <div className="fashion-grid-text">
      <h2>{heading}</h2>
      {subHading && <h3>{subHading}</h3>}
      {children}
      <MoreLink linkText={linkText} linkTo={linkTo} />
    </div>
  </section>
);

export default FashionGridItem;
