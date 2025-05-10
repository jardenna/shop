import { ReactNode } from 'react';
import LayoutElement from '../../layout/LayoutElement';

type CardContentProps = {
  children: ReactNode;
  heading: string | null;
  className?: string;
};

const CardContent = ({
  children,
  className = '',
  heading,
}: CardContentProps) => (
  <div className={`admin-card card-${className}`}>
    <span className="card-top-line" />
    <section className="admin-card-content">
      {heading && (
        <LayoutElement as="header" ariaLabel="card">
          <h2 className="admin-card-title">{heading}</h2>
        </LayoutElement>
      )}
      {children}
    </section>
  </div>
);

export default CardContent;
