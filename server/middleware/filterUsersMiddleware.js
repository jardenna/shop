function filterUsersMiddleware(req, res, next) {
  const {
    username: usernameValue,
    email: emailNameValue,
    role: roleValue,
  } = req.query;

  const filter = {};

  // Filter by username
  if (usernameValue) {
    filter.username = usernameValue;
  }

  // Filter by email
  if (emailNameValue) {
    filter.email = emailNameValue;
  }

  // Filter by username
  if (roleValue) {
    filter.role = roleValue;
  }

  req.filter = filter;

  next();
}

export default filterUsersMiddleware;
