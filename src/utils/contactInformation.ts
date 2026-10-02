interface ContactInformation {
  email: string;
  phone: string;
  website: string;
}

interface ShopInformation {
  city: string;
  cvr: string;
  street: string;
}

export const contactInformation: ContactInformation = {
  email: 'contact@fashionfusion.com',
  phone: '+45 12 34 56 78',
  website: 'www.fashionfusion.com',
};

export const shopInformation: ShopInformation = {
  street: 'Street 12',
  city: '2100 Copenhagen, Denmark',
  cvr: '12345678',
};

export const shopName = 'Fashion Fusion';

export const shopInformationList = Object.values(shopInformation);
export const contactInformationList = Object.values(contactInformation);
