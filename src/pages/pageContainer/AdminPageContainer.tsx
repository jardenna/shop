import type { ReactNode, RefObject } from 'react';
import PageHeader from '../../components/pageHeader/PageHeader';
import MetaTags from '../../layout/MetaTags';
import { ariaInfoTitle } from '../../utils/utils';

type AdminPageContainerProps = {
  ariaLabelledby: string;
  children: ReactNode;
  heading: string;
  linkText?: string;
  linkTo?: string;
  scrollToRef?: RefObject<HTMLHeadingElement | null>;
  variant?: 'small' | 'medium' | 'large' | 'x-large';
};

const AdminPageContainer = ({
  children,
  heading,
  linkText,
  linkTo,
  variant = 'large',
  scrollToRef,
  ariaLabelledby,
}: AdminPageContainerProps) => {
  const ariaTitle = ariaInfoTitle(ariaLabelledby);

  return (
    <section
      className={`admin-page page-${variant}`}
      aria-labelledby={ariaTitle}
    >
      <MetaTags metaTitle={heading} />
      <PageHeader
        heading={heading}
        linkText={linkText}
        linkTo={linkTo}
        ariaLabelledby={ariaTitle}
      />
      <div className="page-card" ref={scrollToRef}>
        {children}
      </div>
    </section>
  );
};

export default AdminPageContainer;
