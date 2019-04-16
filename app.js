const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");

const logger = require("morgan");

const helmet = require("helmet");
const expressip = require("express-ip");

const graphqlHttp = require("express-graphql");
const sequelize = require("./utils/database");

const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");

var serveIndex = require("serve-index");

const passport = require("passport");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

require("./auth/auth");

const questionRoute = require("./routes/questions");
const apiRoute = require("./routes/api");
const usersRoute = require("./routes/users");
const miscRoute = require("./routes/misc");
const adminRoute = require("./routes/admin");

mongoose
  .connect(
    "mongodb+srv://root:yFFqsF4R5CkZwSjc@quiz-t7evv.mongodb.net/Quiz?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(res => {
    console.log("MongoDB connected...");
  })
  .catch(err => {
    console.log("MongoDB failed to connect!", err);
  });
mongoose.set("useFindAndModify", false);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(helmet());

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"), { dotfiles: "allow" }));

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    pretty: true,
    graphiql: true
  })
);

app.use(
  "/.well-known",
  express.static(".well-known"),
  serveIndex(".well-known")
);

app.use(expressip().getIpInfoMiddleware);

app.use("/admin", passport.authenticate("jwt", { session: false }), adminRoute);
app.use("/api", apiRoute);
app.use("/questions", questionRoute);
app.use("/users", usersRoute);
app.use("/misc", miscRoute);
app.use("/savedLocale", (req, res, next) => {
  const ipInfo = req.ipInfo;
  // var message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
  res.send(ipInfo);
});
app.use("*", (req, res) => {
  console.log("404 (Page not found)");
  res.status(404).send();
});

//yFFqsF4R5CkZwSjc

// sequelize.sync().then(result => {
//     // console.log(result);
//     console.log("MySQL DB connected...")
//     console.log("Sequelize models synced...");

// })
//     .catch(err => {
//         console.log("Error in sequelize syncing " + err);
//     });

module.exports = app;
