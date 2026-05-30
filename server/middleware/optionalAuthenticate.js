import asyncHandler from './asyncHandler.js';

const optionalAuthenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = await User.findById(decoded.userId).select('-password');

    next();
  } catch {
    req.user = null;
    next();
  }
});

export { optionalAuthenticate };
