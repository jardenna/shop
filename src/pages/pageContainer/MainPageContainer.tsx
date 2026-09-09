import { useId, type ReactNode } from 'react';
import PageHeader from '../../components/pageHeader/PageHeader';
import MetaTags from '../../layout/MetaTags';
import { SizeVariant } from '../../types/types';

type MainPageContainerProps = {
  children: ReactNode;
  heading: string;
  className?: string;
  hideBreadCrumbs?: boolean;
  variant?: SizeVariant;
};

// Accept display text, not translation keys.
const MainPageContainer = ({
  children,
  heading,
  className = '',
  variant,
  hideBreadCrumbs,
}: MainPageContainerProps) => {
  const ariaLabelledby = useId();

  return (
    <section
      className={`container ${variant ? `page-${variant}` : ''} ${className}`}
      aria-labelledby={ariaLabelledby}
    >
      <MetaTags metaTitle={heading} />
      <PageHeader
        heading={heading}
        ariaLabelledby={ariaLabelledby}
        hideBreadCrumbs={hideBreadCrumbs}
      />
      {children}
    </section>
  );
};

export default MainPageContainer;
