import { ReactNode } from 'react';
import { SizeVariant } from '../../types/types';
import SkeletonBreadCrumbs from './SkeletonBreadCrumbs';
import SkeletonHeader from './SkeletonHeader';

interface SkeletonAdminPageProps {
  children: ReactNode;
  variant?: SizeVariant;
}

const SkeletonAdminPage = ({
  variant = 'small',
  children,
}: SkeletonAdminPageProps) => (
  <div className={`skeleton-admin-page skeleton-column page-${variant}`}>
    <SkeletonBreadCrumbs />
    <SkeletonHeader hideLink />
    <div className="page-cart">
      <div className="skeleton-column">{children}</div>
    </div>
  </div>
);

export default SkeletonAdminPage;
