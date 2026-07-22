const baseAuthEndpoint = 'auth';
const baseCartEndpoint = 'cart';
const baseOrderEndpoint = 'orders';
const baseUserEndpoint = 'users';

export const authEndpoints = {
  register: `${baseAuthEndpoint}/register`,
  create: `${baseAuthEndpoint}/admin/create-user`,
  login: `${baseAuthEndpoint}/login`,
  logout: `${baseAuthEndpoint}/logout`,
  checkAuth: `${baseAuthEndpoint}/check-auth`,
};

export const userUrl = baseUserEndpoint;
export const profileUrl = `${baseUserEndpoint}/profile`;
export const addressUrl = `${baseUserEndpoint}/profile/addresses`;
export const categoryUrl = 'categories';
export const subCategoryUrl = 'subcategories';
export const favoritesUrl = 'favorites';
export const subCategoryMenuUrl = 'subcategories/menu/?parentCategoryName=';
export const productUrl = 'products';
export const uploadUrl = 'upload';
export const cartUrl = baseCartEndpoint;
export const guestCartUrl = `${baseCartEndpoint}/guest`;
export const promoCodeurl = `${baseCartEndpoint}/promo-code`;
export const ordersUrl = baseOrderEndpoint;
export const userOrdersUrl = `${baseOrderEndpoint}/me`;
export const checkoutUrl = 'checkout';
