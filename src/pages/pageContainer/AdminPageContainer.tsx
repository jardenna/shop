import { useId, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import PageHeader from '../../components/PageHeader';
import MetaTags from '../../layout/MetaTags';
import { SizeVariant } from '../../types/types';

interface AdminPageContainerProps {
  children: ReactNode;
  heading: string;
  className?: string;
  linkText?: string;
  linkTo?: string;
  variant?: SizeVariant;
}

const AdminPageContainer = ({
  children,
  heading,
  linkText,
  linkTo,
  variant = 'large',
  className = '',
}: AdminPageContainerProps) => {
  const ariaLabelledby = useId();
  const location = useLocation();

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
        state={{
          returnTo: `${location.pathname}${location.search}`,
        }}
      />
      <div className="page-cart">{children}</div>
    </section>
  );
};

export default AdminPageContainer;
