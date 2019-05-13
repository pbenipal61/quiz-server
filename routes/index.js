const apiRoute = require('./api');
const adminRoute = require('./admin');

const init = (app) => {
  app.use('*', function(req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });
  app.use('/', (req, res, next) => {
    res.status(200).send(req.ipInfo);
  });
  app.use('/api', apiRoute);
  app.use('/admin', adminRoute);
  app.use('/savedLocale', (req, res, next) => {
    const ipInfo = req.ipInfo;
    res.send(ipInfo);
  });
  app.use('*', (req, res) => {
    console.log('404 (Page not found)');
    res.status(404).send();
  });
};

module.exports = init;
