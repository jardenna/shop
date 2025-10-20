import type { ReactNode } from 'react';
import PageHeader from '../../components/pageHeader/PageHeader';
import MetaTags from '../../layout/nav/MetaTags';
import { ariaInfoTitle } from '../../utils/utils';

type AdminPageContainerProps = {
  ariaLabelledby: string;
  children: ReactNode;
  heading: string;
  linkText?: string;
  linkTo?: string;
  variant?: 'small' | 'medium' | 'large';
};

const AdminPageContainer = ({
  children,
  heading,
  linkText,
  linkTo,
  variant = 'large',
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
      <div className="page-card">{children}</div>
    </section>
  );
};

export default AdminPageContainer;
