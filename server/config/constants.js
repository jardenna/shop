const ALLOWED_ROLES = ['Employee', 'User'];

const ALLOWED_FASHION_PREFERENCES = [
  'mensFashion',
  'womensFashion',
  'kidsFashion',
  'noPreference',
];

const STATUS = {
  PUBLISHED: 'Published',
  INACTIVE: 'Inactive',
  SCHEDULED: 'Scheduled',
};

const { PUBLISHED, INACTIVE, SCHEDULED } = STATUS;

const SHOE_SIZES = ['36', '37', '38', '39', '40', '41', '42', 'Onesize'];
const MEN_SHOE_SIZES = ['40', '41', '42', '43', '44', '45', '46', 'Onesize'];

const KIDS_SHOE_SIZES = [
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

const CLOTHING_SIZES = ['S', 'M', 'L', 'XL'];

const MB = 1024 * 1024;
const MAX_FILE_SIZE = 1 * MB;
const MAX_FILES = 5;

const VAT_RATE = 25;
const VAT_SHARE = VAT_RATE / (100 + VAT_RATE);

const ALLOWED_PAYMENT_METHODS = ['Credit Card', 'PayPal', 'MobilePay'];
const PAYMENT_METHODS = {
  CREDIT_CARD: 'Credit Card',
  PAYPAL: 'PayPal',
  MOBILEPAY: 'MobilePay',
};

export {
  ALLOWED_FASHION_PREFERENCES,
  ALLOWED_PAYMENT_METHODS,
  ALLOWED_ROLES,
  CLOTHING_SIZES,
  INACTIVE,
  KIDS_SHOE_SIZES,
  MAX_FILE_SIZE,
  MAX_FILES,
  MEN_SHOE_SIZES,
  PAYMENT_METHODS,
  PUBLISHED,
  SCHEDULED,
  SHOE_SIZES,
  STATUS,
  VAT_SHARE,
};
