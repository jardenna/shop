import { ReactNode } from 'react';

type CategoryCardContentProps = {
  children: ReactNode;
  className: string;
};

const CategoryCardContent = ({
  children,
  className,
}: CategoryCardContentProps) => (
  <section className={`category-card card-${className}`}>
    <span className="card-top-line" />
    <div className="category-card-content">{children}</div>
  </section>
);

export default CategoryCardContent;
