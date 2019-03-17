const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const helmet = require("helmet");

const graphqlHttp = require('express-graphql');
const sequelize = require('./utils/database');

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const questionRoute = require('./routes/questions');
const gameplayRoute = require('./routes/gameplay');
const usersRoute = require('./routes/users');

app.use(helmet());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS,GET,POST,PUT,PATCH,DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});
app.use(
    '/graphql',
    graphqlHttp({

        schema: graphqlSchema,
        pretty: true,
        graphiql: true

    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/gameplay', gameplayRoute);
app.use('/questions', questionRoute);
app.use('/users', usersRoute);

app.use('/', (req, res, next) => {

    console.log("404 (Page not found)");
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