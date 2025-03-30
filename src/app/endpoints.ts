const baseAuthApi = 'auth';
const baseUserApi = 'users';
const baseCategoryApi = 'category';

const authEndpoints = {
  register: `${baseAuthApi}/register`,
  login: `${baseAuthApi}/login`,
  logout: `${baseAuthApi}/logout`,
  checkAuth: `${baseAuthApi}/check-auth`,
};

const userEndpoints = {
  users: baseUserApi,
  userProfile: `${baseAuthApi}/profile`,
};

const categoryEndpoints = {
  categories: baseCategoryApi,
};

export { authEndpoints, categoryEndpoints, userEndpoints };
