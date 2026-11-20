import { useId, type ReactNode } from 'react';
import PageHeader from '../../components/PageHeader';
import MetaTags from '../../layout/MetaTags';
import type { SizeVariant } from '../../shared/types';

interface MainPageContainerProps {
  children: ReactNode;
  heading: string;
  className?: string;
  variant?: SizeVariant;
}

// Accept display text, not translation keys.
const MainPageContainer = ({
  children,
  heading,
  className = '',
  variant,
}: MainPageContainerProps) => {
  const ariaLabelledbyId = useId();

  return (
    <section
      className={`container ${variant ? `page-${variant}` : ''} ${className}`}
      aria-labelledby={ariaLabelledbyId}
    >
      <MetaTags metaTitle={heading} />
      <PageHeader heading={heading} ariaLabelledby={ariaLabelledbyId} />
      {children}
    </section>
  );
};

export default MainPageContainer;
