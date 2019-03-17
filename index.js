const http = require('http');
const https = require("https");
const fs = require("fs");
const app = require('./app');
const port = process.env.PORT || 80;


const server = http.createServer(app);
server.listen(port, () => {
    console.log(`App running on port ${port}`);
});
