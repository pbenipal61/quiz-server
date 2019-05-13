const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const expressIp = require('express-ip');
const mongoose = require('mongoose');
const serveIndex = require('serve-index');
const sequelize = require('./utils/database');
const app = express();
const cors = require('cors');
require('dotenv').config();

mongoose.connect(
    process.env.MONGO_CONNECTION,
    {useNewUrlParser: true}
)
    .then((res) => {
      console.log('MongoDB connected...');
    })
    .catch((err) => {
      console.log('MongoDB failed to connect!', err);
    });
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    '/.well-known',
    express.static('.well-known'),
    serveIndex('.well-known')
);
app.use(expressIp().getIpInfoMiddleware);

const routes = require('./routes');
routes(app);
sequelize.sync().then((result) => {
  // console.log(result);
  console.log('Sequelize models synced');
})
    .catch((err) => {
      console.log('Error in sequelize syncing ' + err);
    });
module.exports = app;

