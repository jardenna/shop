const languageMiddleware = (req, res, next) => {
  let lang = req.headers['x-language'] || 'da';
  req.lang = lang.replace(/^"+|"+$/g, '');
  next();
};

export default languageMiddleware;
