const baseAuthApi = 'auth';
const adminUrl = '/admin/';

const authEndpoints = {
  register: `${baseAuthApi}/register`,
  create: `${baseAuthApi}${adminUrl}create-user`,
  login: `${baseAuthApi}/login`,
  logout: `${baseAuthApi}/logout`,
  checkAuth: `${baseAuthApi}/check-auth`,
};

const userUrl = '/users';
const categoryUrl = '/categories';
const subCategoryUrl = '/subcategories';
const productUrl = '/products';
const uploadUrl = '/upload';

export {
  adminUrl,
  authEndpoints,
  categoryUrl,
  productUrl,
  subCategoryUrl,
  uploadUrl,
  userUrl,
};
