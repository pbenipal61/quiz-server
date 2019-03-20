const http = require('http');
const https = require("https");
const fs = require("fs");
const app = require('./app');


const dotenv = require('dotenv');
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



if (process.env.NODE_ENV != 'development') {


    const privateKey = fs.readFileSync('/etc/letsencrypt/live/postmaninteractive.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/postmaninteractive.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/postmaninteractive.com/chain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    const https_server = https.createServer(credentials, app);
    https_server.listen(https_port, () => {
        console.log(`HTTPS server up`);
    });

    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ server: https_server });

    wss.on('connection', function connection(ws) {

        //  console.log("clients are ", wss.clients);

        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });
        console.log(ws);
        ws.send('aint gonna curse dawg');
    });



} else {
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ server: http_server });

    wss.on('connection', function connection(ws) {

        //  console.log("clients are ", wss.clients);

        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });
        console.log(ws);
        ws.send('aint gonna curse dawg');
    });



}


