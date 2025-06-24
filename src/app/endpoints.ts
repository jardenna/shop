const baseAuthApi = 'auth';

const authEndpoints = {
  register: `${baseAuthApi}/register`,
  create: `${baseAuthApi}/admin/create-user`,
  login: `${baseAuthApi}/login`,
  logout: `${baseAuthApi}/logout`,
  checkAuth: `${baseAuthApi}/check-auth`,
};

const userUrl = '/users';
const categoryUrl = '/categories';
const subCategoryUrl = '/subcategories';
const favoritesUrl = '/favorites';
const subCategoryMenuUrl = '/subcategories/menu/?parentCategoryName=';
const productUrl = '/products';
const uploadUrl = '/upload';

export {
  authEndpoints,
  categoryUrl,
  favoritesUrl,
  productUrl,
  subCategoryMenuUrl,
  subCategoryUrl,
  uploadUrl,
  userUrl,
};
