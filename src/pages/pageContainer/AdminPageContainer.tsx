import { useId, type ReactNode, type RefObject } from 'react';
import PageHeader from '../../components/pageHeader/PageHeader';
import MetaTags from '../../layout/MetaTags';

type AdminPageContainerProps = {
  children: ReactNode;
  heading: string;
  className?: string;
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
  className = '',
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
      />
      <div className="page-cart" ref={scrollToRef}>
        {children}
      </div>
    </section>
  );
};

export default AdminPageContainer;
