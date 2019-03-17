const http = require('http');
const https = require("https");
const fs = require("fs");
const app = require('./app');
const port = process.env.PORT || 80;
const https_port = 443;

const privateKey = fs.readFileSync('/etc/letsencrypt/live/postmaninteractive.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/postmaninteractive.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/postmaninteractive.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const http_server = http.createServer(app);
http_server.listen(port, () => {
    console.log("HTTP server up");
});

const server = https.createServer(credentials, app);
server.listen(https_port, () => {
    console.log(`HTTPS server up`);
});

