function filterUsersMiddleware(req, res, next) {
  const { username, email, role } = req.query;

  const filter = {};

  // Filter by username (case-insensitive, partial match, supports multiple values)
  if (username) {
    const values = Array.isArray(username) ? username : username.split(',');

    filter.$or = values.map((value) => ({
      username: {
        $regex: value.trim(),
        $options: 'i',
      },
    }));
  }

  // Filter by email (case-insensitive, partial match)
  if (email) {
    filter.email = {
      $regex: email.trim(),
      $options: 'i',
    };
  }

  if (role) {
    filter.role = role;
  }

  req.filter = filter;

  next();
}

export default filterUsersMiddleware;
