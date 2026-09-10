import { SizeVariant } from '../../types/types';
import SkeletonBreadCrumbs from './SkeletonBreadCrumbs';
import SkeletonFooter from './SkeletonFooter';
import SkeletonHeader from './SkeletonHeader';
import SkeletonInputList from './SkeletonInputList';

interface SkeletonAdminPageProps {
  count?: number;
  variant?: SizeVariant;
}

const SkeletonAdminPage = ({
  count = 2,
  variant = 'small',
}: SkeletonAdminPageProps) => (
  <div className={`skeleton-admin-page skeleton-column page-${variant}`}>
    <SkeletonBreadCrumbs />
    <SkeletonHeader hideLink />
    <div className="page-cart">
      <div className="skeleton-column">
        <SkeletonInputList count={count} />
        <SkeletonFooter />
      </div>
    </div>
  </div>
);

export default SkeletonAdminPage;
