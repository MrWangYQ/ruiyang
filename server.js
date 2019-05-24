const express = require('express');
var path = require('path');
var os = require("os");

var networkInterfaces = os.networkInterfaces();

const app = express();
const port = 3001;

// // 加载静态资源
app.use(express.static(path.join(__dirname, './')));

// // os 以太网的所有信息
// // console.info(networkInterfaces);
var ip = networkInterfaces['WLAN'][1].address
    // console.log(ip);
    // // 监听端口
app.listen(port, function(parmas) {
    console.log('listen to http://' + '0.0.0.0' + ':' + port);
})
var https = require('https'),
    fs = require("fs");

var options = {
    key: fs.readFileSync('./server/privkey.pem'),
    cert: fs.readFileSync('./server/server.pem')
};

https.createServer(options, app).listen(3011, function() {
    console.log('Https server listening on port ' + 3001);
});