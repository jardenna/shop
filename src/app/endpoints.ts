const baseAuthApi = 'auth';
const baseUserApi = 'users';

const authEndpoints = {
  register: `${baseAuthApi}/register`,
  login: `${baseAuthApi}/login`,
  logout: `${baseAuthApi}/logout`,
  checkAuth: `${baseAuthApi}/check-auth`,
};

const userEndpoints = {
  users: baseUserApi,
  user: `${baseAuthApi}/id`,
  userProfile: `${baseAuthApi}/profile`,
};

export { authEndpoints, userEndpoints };
