import type { ReactNode } from 'react';
import PageHeader from '../../components/pageHeader/PageHeader';
import useLanguage from '../../features/language/useLanguage';
import MetaTags from '../../layout/nav/MetaTags';

type MainPageContainerProps = {
  children: ReactNode;
  heading: string;
  className?: string;
};

const MainPageContainer = ({
  children,
  heading,
  className = '',
}: MainPageContainerProps) => {
  const ariaLabelledby = `${heading}-title`;
  const { language } = useLanguage();

  return (
    <>
      <MetaTags metaTitle={language[heading]} />
      <section
        className={`container ${className}`}
        aria-labelledby={ariaLabelledby}
      >
        <PageHeader
          heading={language[heading]}
          ariaLabelledby={ariaLabelledby}
        />
        {children}
      </section>
    </>
  );
};

export default MainPageContainer;
