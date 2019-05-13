const http = require('http');
const https = require('https');
const fs = require('fs');
const socket = require('socket.io');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;


  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log('HTTP server up');
  });
  startWebsocketServer(httpServer);


const SocketStore = require('./utils/socketsStore');
socketStore = new SocketStore().getInstance();
function startWebsocketServer(server) {
  const io = socket(server);
  io.on('connection', (socket) => {
    console.log('Made socket connection');

    socket.on('login', async (data) => {
      console.log(data);
      socketStore.add(data.id, socket);
      const userData = await fetchUserData(data.id);
      socket.emit('login', userData);
    });
  });


  const User = require('./models/mongoose/user');
  const fetchUserData = (id) => {
    return new Promise((resolve, reject) => {
      const updateObj = {
        $inc: {
          loginCount: +1,
        },
        lastLogin: Date.now(),
      };
      User.findOneAndUpdate({
        originPlatformID: id,
      }, updateObj)
          .select('-firstLogin -originPlatform -originPlatformID -privilege -name')
          .exec()
          .then((user) => {
            resolve(user);
            
          })
          .catch((err) => {
            reject(err);
          
          });
    });
  };
}
