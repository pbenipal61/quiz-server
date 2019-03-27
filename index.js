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

    startWebsocketServer(https_server);


} else {
    startWebsocketServer(http_server);
}

function startWebsocketServer(server) {

    var WebsocketClientsStore = require('./utils/websocketClientsStore');
    var wscs = new WebsocketClientsStore().getInstance();
    console.log("clients length before websockets connected is ", Object.keys(wscs._data).length);

    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ server: server });

    wss.on('connection', function connection(ws) {

        ws.on('message', function incoming(message) {

            var t = JSON.parse(message);
            console.log(message);
            if (t["type"] === "first_event") {
                console.log("First event with ", t["id"]);
                var tempConn = wscs.get(t["id"]);
                if (tempConn != null) {
                    if (wscs.isOpen(t["id"])) {
                        ws.send("Another open connection already exists");
                    } else {
                        wscs.add(t["id"], ws);
                        fetchUserData(t["id"], ws);
                    }
                } else {
                    wscs.add(t["id"], ws);
                    fetchUserData(t["id"], ws);
                }

            } else {
                console.log(wscs.sendDataToClient(t["sendTo"], true, t["message"]));
            }

        });
        ws.on('close', function closing(evt) {

            console.log(evt);
            console.log("A socket closed");
        });
        // ws.send('Welcome to MadMind');
    });

    wss.once('disconnect', function (client) {
        // socket is disconnected
        console.log(client);
        console.log("A socket disconnected");
    });


    const User = require('./models/user');
    const fetchUserData = (id, ws) => {
        console.log("here")
        // User.find({ $where: { "originPlatformID": id } }).exec().then(user => {

        //     ws.send(user);

        // }).catch(err => {
        //     const obj = {
        //         "message": "Failed to fetch user",
        //         "error": err
        //     }

        // });

        User.findOne({ "originPlatformID": id }).exec().then(user => {
            var obj = { "type": "first_event", "user": user };
            ws.send(JSON.stringify(obj));

        }).catch(err => {
            const obj = {
                "message": "Failed to fetch user",
                "error": err
            }

        });


    }
}


