function filterUsersMiddleware(req, res, next) {
  const {
    username: usernameValue,
    email: emailValue,
    role: roleValue,
  } = req.query;

  const filter = {};

  // Filter by username (case-insensitive, partial match, supports multiple values)
  if (usernameValue) {
    const values = Array.isArray(usernameValue)
      ? usernameValue
      : usernameValue.split(',');

    filter.$or = values.map((value) => ({
      username: {
        $regex: value.trim(),
        $options: 'i',
      },
    }));
  }

  // Filter by email (case-insensitive, partial match)
  if (emailValue) {
    filter.email = {
      $regex: emailValue.trim(),
      $options: 'i',
    };
  }

  if (roleValue) {
    filter.role = roleValue;
  }

  req.filter = filter;

  next();
}

export default filterUsersMiddleware;
