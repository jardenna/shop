import MoreLink from '../../../components/MoreLink';

type FashionGridItemProps = {
  className: string;
  heading: string;
  linkText: string;
  linkTo: string;
  text: string;
  subHading?: string;
};

const FashionGridItem = ({
  className,
  text,
  heading,
  linkTo,
  linkText,
  subHading,
}: FashionGridItemProps) => (
  <section className={`fashion-grid-item ${className}`}>
    <div className="fashion-grid-text">
      <h2>{heading}</h2>
      {subHading && <h3>{subHading}</h3>}
      <p>{text}</p>
      <MoreLink linkText={linkText} linkTo={linkTo} />
    </div>
  </section>
);

export default FashionGridItem;
