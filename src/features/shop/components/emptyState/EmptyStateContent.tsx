import { ReactNode } from 'react';
import Picture from '../../../../components/Picture';

export interface BaseEmptyStateProps {
  emptyStateText: string;
  emptyStateTitle: string;
  src: string;
}

interface EmptyStateContentProps extends BaseEmptyStateProps {
  children: ReactNode;
}

const EmptyStateContent = ({
  children,
  emptyStateText,
  emptyStateTitle,
  src,
}: EmptyStateContentProps) => (
  <section className="empty-state">
    <div>
      <Picture
        src={`${src}.png`}
        srcSet={src}
        alt=""
        priority
        className="empty-state-img"
      />
    </div>
    <div className="empty-state-info">
      <h2 className="empty-space-heading">{emptyStateTitle}</h2>
      <p role="status" aria-atomic="true">
        {emptyStateText}.
      </p>

      {children}
    </div>
  </section>
);

export default EmptyStateContent;
