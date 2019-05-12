const http = require("http");
const https = require("https");
const fs = require("fs");

const socket = require('socket.io');

const app = require("./app");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.HTTP_PORT || 80;
const https_port = process.env.HTTPS_PORT || 443;

const http_server = http.createServer(app);

// var io = require('socket.io')(http_server);

// io.on('connection', function (socket) {
//     console.log(io.engine.generateId());
//     console.log(socket);
//     console.log('a user connected');
//     socket.emit('connected', 'welcome to the game new user');

//     socket.on("message",
//         function (data) {
//             console.log("message " + data);
//             server.clients.forEach(
//                 function (client) {
//                     client.send(data);
//                 });
//         });

// });

http_server.listen(port, () => {
  console.log("HTTP server up");
});

if (process.env.NODE_ENV != "development") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/postmaninteractive.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/postmaninteractive.com/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/postmaninteractive.com/chain.pem",
    "utf8"
  );

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  const https_server = https.createServer(credentials, app);
  https_server.listen(https_port, () => {
    console.log(`HTTPS server up`);
  });

  startWebsocketServer(https_server);
} else {
  startWebsocketServer(http_server);
}
const SocketStore = require('./utils/socketsStore');
socketStore = new SocketStore().getInstance();
function startWebsocketServer(server) {

  var io = socket(server);
  io.on('connection', (socket) => {

    console.log("Made socket connection");

    socket.on('login', async (data) => {
      console.log(data);
      socketStore.add(data.id, socket);
      var userData = await fetchUserData(data.id);
      socket.emit('login', userData);
    });

  });



  const User = require("./models/user");
  const fetchUserData = (id) => {

    return new Promise((resolve, reject) => {


      var updateObj = {
        $inc: {
          loginCount: +1
        },
        lastLogin: Date.now()
      };
      User.findOneAndUpdate({
          originPlatformID: id
        }, updateObj)
        .select("-firstLogin -originPlatform -originPlatformID -privilege -name")
        .exec()
        .then(user => {

          resolve(user);
          // var obj = {
          //   type: "first_event",
          //   user: user
          // };

          // ws.send(JSON.stringify(obj));
        })
        .catch(err => {

          reject(err);
          // const obj = {
          //   message: "Failed to fetch user",
          //   error: err
          // };
        });

    });

  };
}