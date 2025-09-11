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
import ChevronDownIcon from './ChevronDownIcon';
import ChevronLeftIcon from './ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon';
import CircleChevronRightIcon from './CircleChevronRightIcon';
import CloseIcon from './CloseIcon';
import KidIcon from './colors/KidIcon';
import ManIcon from './colors/ManIcon';
import WomanIcon from './colors/WomanIcon';
import DashboardIcon from './DashboardIcon';
import DublicateIcon from './DublicateIcon';
import ErrorIcon from './ErrorIcon';
import EyeIcon from './EyeIcon';
import EyeOffIcon from './EyeOffIcon';
import FilterIcon from './FilterIcon';
import GridIcon from './GridIcon';
import GridLargeIcon from './GridLargeIcon';
import GridSmallIcon from './GridSmallIcon';
import HalfStarIcon from './HalfStarIcon';
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
import PencilIcon from './PencilIcon';
import ProductsIcon from './ProductsIcon';
import SearchIcon from './SearchIcon';
import ShoppingBagIcon from './ShoppingBagIcon';
import StarIcon from './StarIcon';
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
  chevronDown: ChevronDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  circleChevronRight: CircleChevronRightIcon,
  close: CloseIcon,
  dashboard: DashboardIcon,
  dublicate: DublicateIcon,
  error: ErrorIcon,
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  filter: FilterIcon,
  grid: GridIcon,
  gridLarge: GridLargeIcon,
  gridSmall: GridSmallIcon,
  halfStar: HalfStarIcon,
  heart: HeartIcon,
  image: ImageIcon,
  info: InfoIcon,
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
  pencil: PencilIcon,
  products: ProductsIcon,
  search: SearchIcon,
  shoppingBag: ShoppingBagIcon,
  star: StarIcon,
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
  size = '1.5em',
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
