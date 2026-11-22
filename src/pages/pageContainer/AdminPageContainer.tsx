import { useId, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import PageHeader from '../../components/PageHeader';
import MetaTags from '../../layout/MetaTags';
import type { SizeVariant } from '../../shared/types';

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
  const ariaLabelledbyId = useId();
  const location = useLocation();

  return (
    <section
      className={`admin-page page-${variant} ${className}`}
      aria-labelledby={ariaLabelledbyId}
    >
      <MetaTags metaTitle={heading} />
      <PageHeader
        heading={heading}
        linkText={linkText}
        linkTo={linkTo}
        ariaLabelledby={ariaLabelledbyId}
        state={{
          returnTo: `${location.pathname}${location.search}`,
        }}
      />
      <div className="page-card">{children}</div>
    </section>
  );
};

export default AdminPageContainer;
