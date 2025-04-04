const baseAuthApi = 'auth';

const authEndpoints = {
  register: `${baseAuthApi}/register`,
  login: `${baseAuthApi}/login`,
  logout: `${baseAuthApi}/logout`,
  checkAuth: `${baseAuthApi}/check-auth`,
};

const userUrl = '/users';
const categoryUrl = '/category';
const productUrl = '/products';
const uploadUrl = '/upload';

export { authEndpoints, categoryUrl, productUrl, uploadUrl, userUrl };
