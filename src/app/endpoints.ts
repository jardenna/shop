const baseAuthApi = 'auth';

export const authEndpoints = {
  register: `${baseAuthApi}/register`,
  create: `${baseAuthApi}/admin/create-user`,
  login: `${baseAuthApi}/login`,
  logout: `${baseAuthApi}/logout`,
  checkAuth: `${baseAuthApi}/check-auth`,
};

export const userUrl = '/users';
export const profileUrl = '/users/profile';
export const categoryUrl = '/categories';
export const subCategoryUrl = '/subcategories';
export const favoritesUrl = '/favorites';
export const subCategoryMenuUrl = '/subcategories/menu/?parentCategoryName=';
export const productUrl = '/products';
export const uploadUrl = '/upload';
export const cartUrl = '/cart';
export const guestCartUrl = '/cart/guest';
export const ordersUrl = '/orders';
export const userOrdersUrl = '/orders/me';
