import { useId, type ReactNode } from 'react';
import PageHeader from '../../components/pageHeader/PageHeader';
import MetaTags from '../../layout/MetaTags';

type AdminPageContainerProps = {
  children: ReactNode;
  heading: string;
  className?: string;
  hideBreadCrumbs?: boolean;
  linkText?: string;
  linkTo?: string;
  variant?: 'small' | 'medium' | 'large' | 'x-large';
};

const AdminPageContainer = ({
  children,
  heading,
  linkText,
  linkTo,
  variant = 'large',
  className = '',
  hideBreadCrumbs,
}: AdminPageContainerProps) => {
  const ariaLabelledby = useId();

  return (
    <section
      className={`admin-page page-${variant} ${className}`}
      aria-labelledby={ariaLabelledby}
    >
      <MetaTags metaTitle={heading} />
      <PageHeader
        heading={heading}
        linkText={linkText}
        linkTo={linkTo}
        ariaLabelledby={ariaLabelledby}
        hideBreadCrumbs={hideBreadCrumbs}
      />
      <div className="page-cart">{children}</div>
    </section>
  );
};

export default AdminPageContainer;
