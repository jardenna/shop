import type { ReactNode } from 'react';
import PageHeader from '../../components/pageHeader/PageHeader';
import MetaTags from '../../layout/MetaTags';
import { ariaInfoTitle } from '../../utils/utils';

type MainPageContainerProps = {
  children: ReactNode;
  heading: string;
  className?: string;
};

// Accept display text, not translation keys.
const MainPageContainer = ({
  children,
  heading,
  className = '',
}: MainPageContainerProps) => {
  const ariaLabelledby = ariaInfoTitle(heading);

  return (
    <>
      <MetaTags metaTitle={heading} />
      <section
        className={`container ${className}`}
        aria-labelledby={ariaLabelledby}
      >
        <PageHeader heading={heading} ariaLabelledby={ariaLabelledby} />
        {children}
      </section>
    </>
  );
};

export default MainPageContainer;
