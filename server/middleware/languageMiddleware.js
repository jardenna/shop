const languageMiddleware = (req, res, next) => {
  req.lang = req.headers['x-language'] || 'en';
  console.log('Detected Language:', req.lang);
  next();
};

export default languageMiddleware;
