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
import CircleChevronRightIcon from './CircleChevronRightIcon';
import CloseIcon from './CloseIcon';
import DressIcon from './colors/DressIcon';
import KidIcon from './colors/KidIcon';
import ManIcon from './colors/ManIcon';
import WomanIcon from './colors/WomanIcon';
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
import HeartIcon from './HeartIcon';
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
import ShoppingBagIcon from './ShoppingBagIcon';
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
  fill?: string;
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
  circleChevronRight: CircleChevronRightIcon,
  close: CloseIcon,
  dashboard: DashboardIcon,
  dress: DressIcon,
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
  heart: HeartIcon,
  kid: KidIcon,
  language: LanguageIcon,
  layoutGrid: LayoutGridIcon,
  layoutList: LayoutListIcon,
  login: LoginIcon,
  logo: Logo,
  logout: LogoutIcon,
  man: ManIcon,
  menuDotsHorizontal: ThreeDotsHorizontalIcon,
  orders: OrdersIcon,
  products: ProductsIcon,
  search: SearchIcon,
  shoppingBag: ShoppingBagIcon,
  subCategories: SubCategoriesIcon,
  subtract: SubtractIcon,
  success: SuccessIcon,
  trach: TrashIcon,
  undo: UndoIcon,
  upload: UploadIcon,
  user: UserIcon,
  users: UsersIcon,
  warning: WarningIcon,
  woman: WomanIcon,
};

const Icon = ({
  iconName,
  size = '20',
  title,
  className = '',
  ariaHidden,
  fill,
}: IconProps) => {
  const IconComponent = iconMapping[iconName];
  return (
    <IconComponent
      size={size}
      title={title}
      className={className}
      ariaHidden={ariaHidden === undefined ? true : undefined}
      fill={fill}
    />
  );
};

export default Icon;
