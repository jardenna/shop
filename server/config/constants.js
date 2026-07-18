export const ALLOWED_ROLES = ['Employee', 'User'];

export const ALLOWED_FASHION_PREFERENCES = [
  'mensFashion',
  'womensFashion',
  'kidsFashion',
  'noPreference',
];

export const STATUS = {
  PUBLISHED: 'Published',
  INACTIVE: 'Inactive',
  SCHEDULED: 'Scheduled',
};

export const { PUBLISHED, INACTIVE, SCHEDULED } = STATUS;
export const STANDARD_ADDRESS_TYPES = ['addressDelivery', 'addressBilling'];

export const SHOE_SIZES = ['36', '37', '38', '39', '40', '41', '42', 'Onesize'];
export const MEN_SHOE_SIZES = [
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  'Onesize',
];

export const KIDS_SHOE_SIZES = [
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  'Onesize',
];

export const CLOTHING_SIZES = ['S', 'M', 'L', 'XL'];

export const ALLOWED_SIZES = [
  ...new Set([
    ...SHOE_SIZES,
    ...MEN_SHOE_SIZES,
    ...KIDS_SHOE_SIZES,
    ...CLOTHING_SIZES,
  ]),
];

export const MB = 1024 * 1024;
export const MAX_FILE_SIZE = 1 * MB;
export const MAX_FILES = 5;

export const VAT_RATE = 25;
export const EMPLOYEE_DISCOUNT = 15;
export const VAT_SHARE = VAT_RATE / (100 + VAT_RATE);

export const ALLOWED_PAYMENT_METHODS = [
  'Visa',
  'PayPal',
  'MobilePay',
  'Mastercard',
];

export const PAYMENT_METHODS = {
  Visa: 'Visa',
  PAYPAL: 'PayPal',
  MOBILEPAY: 'MobilePay',
  Mastercard: 'Mastercard',
};

export const PAYMENT_STATUS_ENUM = ['PENDING', 'FAILED', 'PAID'];

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  PAID: 'PAID',
};

export const PROMO_CODES = [
  {
    code: 'SUMMER15',
    label: 'summerSale',
    percent: 10,
    active: true,
  },
  {
    code: 'WELCOME10',
    label: 'welcome',
    percent: 10,
    active: false,
  },
  {
    code: 'BLACKFRIDAY',
    label: 'blackFriday',
    percent: 30,
    active: false,
  },
];

export const SHIPPING_PRICE = 49;
export const DISCOUNT_SHIPPING_PRICE = 3500;
