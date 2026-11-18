import { ReactNode } from 'react';
import { SizeVariant } from '../../types/types';
import SkeletonBreadCrumbs from './SkeletonBreadCrumbs';
import SkeletonHeader from './SkeletonHeader';

interface SkeletonAdminPageProps {
  children: ReactNode;
  showLink?: boolean;
  variant?: SizeVariant;
}

const SkeletonAdminPage = ({
  variant = 'small',
  showLink,
  children,
}: SkeletonAdminPageProps) => (
  <div className={`skeleton-admin-page skeleton-column page-${variant}`}>
    <SkeletonBreadCrumbs />
    <SkeletonHeader showLink={showLink} />
    <div className="page-cart">
      <div className="skeleton-column">{children}</div>
    </div>
  </div>
);

export default SkeletonAdminPage;
