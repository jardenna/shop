import { ReactNode } from 'react';
import LayoutElement from '../../layout/LayoutElement';

type CategoryCardContentProps = {
  children: ReactNode;
  className: string;
  heading: string | null;
};

const CategoryCardContent = ({
  children,
  className,
  heading,
}: CategoryCardContentProps) => (
  <div className={`category-card card-${className}`}>
    <span className="card-top-line" />

    <section className="category-card-content">
      {heading && (
        <LayoutElement as="header" ariaLabel="card">
          <h2 className="category-card-title">{heading}</h2>{' '}
        </LayoutElement>
      )}

      {children}
    </section>
  </div>
);

export default CategoryCardContent;
