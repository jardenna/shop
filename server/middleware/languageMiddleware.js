const languageMiddleware = (req, res, next) => {
  req.lang = req.headers['x-language'] || 'da';
  console.log('Detected Language:', req.lang);
  next();
};

export default languageMiddleware;
