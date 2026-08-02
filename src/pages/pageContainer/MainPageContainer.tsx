import type { ReactNode } from 'react';
import PageHeader from '../../components/pageHeader/PageHeader';
import MetaTags from '../../layout/MetaTags';
import { ariaInfoTitle } from '../../utils/utils';

type MainPageContainerProps = {
  children: ReactNode;
  heading: string;
  className?: string;
  hideBreadCrumbs?: boolean;
  variant?: 'small' | 'medium' | 'large';
};

// Accept display text, not translation keys.
const MainPageContainer = ({
  children,
  heading,
  className = '',
  variant,
  hideBreadCrumbs,
}: MainPageContainerProps) => {
  const ariaLabelledby = ariaInfoTitle(heading);

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
