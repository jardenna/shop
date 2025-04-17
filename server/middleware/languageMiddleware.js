const languageMiddleware = (req, res, next) => {
  let lang = req.headers['x-language'] || 'da';
  req.lang = lang.replace(/^"+|"+$/g, '');
  console.log('Detected Language:', req.lang);
  next();
};

export default languageMiddleware;
