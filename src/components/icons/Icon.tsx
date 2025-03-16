import { FC } from 'react';
import { IconName } from '../../types/enums';
import AccountIcon from './AccountIcon';
import AddIcon from './AddIcon';
import AdminIcon from './AdminIcon';
import ArrowDownIcon from './ArrowDownIcon';
import ArrowUpIcon from './ArrowUpIcon';
import AuthIcon from './AuthIcon';
import CategoriesIcon from './CategoriesIcon';
import ChevronDownIcon from './ChevronDownIcon';
import ChevronLeftIcon from './ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon';
import ChevronsLeftIcon from './ChevronsLeftIcon';
import ChevronsRightIcon from './ChevronsRightIcon';
import ChevronUpIcon from './ChevronUpIcon';
import CloseIcon from './CloseIcon';
import DashboardIcon from './DashboardIcon';
import EditIcon from './EditIcon';
import ErrorIcon from './ErrorIcon';
import EyeIcon from './EyeIcon';
import EyeOffIcon from './EyeOffIcon';
import FilterIcon from './FilterIcon';
import GridIcon from './GridIcon';
import GridLargeIcon from './GridLargeIcon';
import GridSmallIcon from './GridSmallIcon';
import InfoIcon from './InfoIcon';
import LanguageIcon from './LanguageIcon';
import LoginIcon from './LoginIcon';
import Logo from './Logo';
import LogoutIcon from './LogoutIcon';
import MoreIcon from './MoreIcon';
import OrdersIcon from './OrdersIcon';
import ProductsIcon from './ProductsIcon';
import SearchIcon from './SearchIcon';
import ShoppingBackIcon from './ShoppingBackIcon';
import SubtractIcon from './SubtractIcon';
import SuccessIcon from './SuccessIcon';
import TrashIcon from './TrashIcon';
import UndoIcon from './UndoIcon';
import UserIcon from './UserIcon';
import UsersIcon from './UsersIcon';
import WarningIcon from './WarningIcon';

export interface IconDefaultProps {
  title: string;
  ariaHidden?: boolean;
  ariaLabel?: string;
  className?: string;
  size?: string;
}

interface IconProps extends IconDefaultProps {
  iconName: IconName;
}

const iconMapping = {
  account: AccountIcon,
  add: AddIcon,
  admin: AdminIcon,
  arrowDown: ArrowDownIcon,
  arrowUp: ArrowUpIcon,
  auth: AuthIcon,
  categories: CategoriesIcon,
  chevronDown: ChevronDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  chevronsLeft: ChevronsLeftIcon,
  chevronsRight: ChevronsRightIcon,
  chevronUp: ChevronUpIcon,
  close: CloseIcon,
  dashboard: DashboardIcon,
  edit: EditIcon,
  error: ErrorIcon,
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  filter: FilterIcon,
  grid: GridIcon,
  gridLarge: GridLargeIcon,
  gridSmall: GridSmallIcon,
  info: InfoIcon,
  language: LanguageIcon,
  login: LoginIcon,
  logo: Logo,
  logout: LogoutIcon,
  more: MoreIcon,
  orders: OrdersIcon,
  products: ProductsIcon,
  search: SearchIcon,
  shoppingBack: ShoppingBackIcon,
  subtract: SubtractIcon,
  success: SuccessIcon,
  trach: TrashIcon,
  undo: UndoIcon,
  user: UserIcon,
  users: UsersIcon,
  warning: WarningIcon,
};

const Icon: FC<IconProps> = ({
  iconName,
  size = '20',
  title,
  className = '',
  ariaHidden,
  ariaLabel,
}) => {
  const IconComponent = iconMapping[iconName];
  return (
    <IconComponent
      size={size}
      title={title}
      className={className}
      ariaHidden={ariaHidden}
      ariaLabel={ariaLabel}
    />
  );
};

export default Icon;
