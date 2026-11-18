import { useId, type ReactNode } from 'react';
import PageHeader from '../../components/PageHeader';
import MetaTags from '../../layout/MetaTags';
import { SizeVariant } from '../../types/types';

type MainPageContainerProps = {
  children: ReactNode;
  heading: string;
  className?: string;
  variant?: SizeVariant;
};

// Accept display text, not translation keys.
const MainPageContainer = ({
  children,
  heading,
  className = '',
  variant,
}: MainPageContainerProps) => {
  const ariaLabelledby = useId();

  return (
    <section
      className={`container ${variant ? `page-${variant}` : ''} ${className}`}
      aria-labelledby={ariaLabelledby}
    >
      <MetaTags metaTitle={heading} />
      <PageHeader heading={heading} ariaLabelledby={ariaLabelledby} />
      {children}
    </section>
  );
};

export default MainPageContainer;
