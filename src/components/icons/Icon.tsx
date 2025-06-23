import { IconName } from '../../types/enums';
import AccountIcon from './AccountIcon';
import AddIcon from './AddIcon';
import AdminIcon from './AdminIcon';
import ArrowDownIcon from './ArrowDownIcon';
import ArrowUpIcon from './ArrowUpIcon';
import AuthIcon from './AuthIcon';
import CalendarIcon from './CalendarIcon';
import CategoriesIcon from './CategoriesIcon';
import CheckIcon from './CheckIcon';
import ChevronLeftIcon from './ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon';
import CircelChevronRightIcon from './CircelChevronRightIcon';
import CloseIcon from './CloseIcon';
import DashboardIcon from './DashboardIcon';
import DublicateIcon from './DublicateIcon';
import EditIcon from './EditIcon';
import ErrorIcon from './ErrorIcon';
import EyeIcon from './EyeIcon';
import EyeOffIcon from './EyeOffIcon';
import FilterIcon from './FilterIcon';
import GridIcon from './GridIcon';
import GridLargeIcon from './GridLargeIcon';
import GridSmallIcon from './GridSmallIcon';
import HartIcon from './HartIcon';
import ImageIcon from './ImageIcon';
import InfoIcon from './InfoIcon';
import LanguageIcon from './LanguageIcon';
import LayoutGridIcon from './LayoutGridIcon';
import LayoutListIcon from './LayoutListIcon';
import LoginIcon from './LoginIcon';
import Logo from './Logo';
import LogoutIcon from './LogoutIcon';
import OrdersIcon from './OrdersIcon';
import ProductsIcon from './ProductsIcon';
import SearchIcon from './SearchIcon';
import ShoppingBackIcon from './ShoppingBackIcon';
import SubCategoriesIcon from './SubCategoriesIcon';
import SubtractIcon from './SubtractIcon';
import SuccessIcon from './SuccessIcon';
import ThreeDotsHorizontalIcon from './ThreeDotsHorizontalIcon';
import TrashIcon from './TrashIcon';
import UndoIcon from './UndoIcon';
import UploadIcon from './UploadIcon';
import UserIcon from './UserIcon';
import UsersIcon from './UsersIcon';
import WarningIcon from './WarningIcon';

export type IconDefaultProps = {
  title: string;
  ariaHidden?: boolean;
  className?: string;
  size?: string;
};

type IconProps = IconDefaultProps & {
  iconName: IconName;
};

const iconMapping = {
  account: AccountIcon,
  add: AddIcon,
  admin: AdminIcon,
  arrowDown: ArrowDownIcon,
  arrowUp: ArrowUpIcon,
  auth: AuthIcon,
  calendar: CalendarIcon,
  categories: CategoriesIcon,
  check: CheckIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  circelChevronRight: CircelChevronRightIcon,
  close: CloseIcon,
  dashboard: DashboardIcon,
  dublicate: DublicateIcon,
  edit: EditIcon,
  error: ErrorIcon,
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  filter: FilterIcon,
  grid: GridIcon,
  gridLarge: GridLargeIcon,
  gridSmall: GridSmallIcon,
  image: ImageIcon,
  info: InfoIcon,
  hart: HartIcon,
  language: LanguageIcon,
  layoutGrid: LayoutGridIcon,
  layoutList: LayoutListIcon,
  login: LoginIcon,
  logo: Logo,
  logout: LogoutIcon,
  menuDotsHorizontal: ThreeDotsHorizontalIcon,
  orders: OrdersIcon,
  products: ProductsIcon,
  search: SearchIcon,
  shoppingBack: ShoppingBackIcon,
  subCategories: SubCategoriesIcon,
  subtract: SubtractIcon,
  success: SuccessIcon,
  trach: TrashIcon,
  undo: UndoIcon,
  upload: UploadIcon,
  user: UserIcon,
  users: UsersIcon,
  warning: WarningIcon,
};

const Icon = ({
  iconName,
  size = '20',
  title,
  className = '',
  ariaHidden,
}: IconProps) => {
  const IconComponent = iconMapping[iconName];
  return (
    <IconComponent
      size={size}
      title={title}
      className={className}
      ariaHidden={ariaHidden === undefined ? true : undefined}
    />
  );
};

export default Icon;
