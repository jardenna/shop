interface ContactInformation {
  email: string;
  phone: string;
  website: string;
}
export const contactInformation: ContactInformation = {
  email: 'contact@fashionfusion.com',
  phone: '+45 12 34 56 78',
  website: 'www.fashionfusion.com',
};

export const contactInformationList = Object.values(contactInformation);
