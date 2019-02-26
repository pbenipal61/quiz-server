const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const questionRoute = require('./routes/questions');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/questions', questionRoute);

app.use('/', (req, res, next) => {

    console.log("404");
    res.status(404).send();

});

sequelize.sync().then(result => {
    // console.log(result);
    console.log("Sequelize models synced");
})
    .catch(err => {
        console.log("Error in sequelize syncing " + err);
    });

module.exports = app;