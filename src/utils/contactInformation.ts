export const shopInformationList = ['city', 'cvr', 'street'] as const;
export const contactInformationList = ['email', 'phone', 'website'] as const;

type ShopInformation = (typeof shopInformationList)[number];
type ContactInformation = (typeof contactInformationList)[number];

export const contactInformation = {
  email: 'contact@fashionfusion.com',
  phone: '+45 12 34 56 78',
  website: 'www.fashionfusion.com',
} as const satisfies Record<ContactInformation, string>;

export const shopInformation = {
  street: 'Street 12',
  city: '2100 Copenhagen, Denmark',
  cvr: '12345678',
} as const satisfies Record<ShopInformation, string>;

export const shopName = 'Fashion Fusion';
