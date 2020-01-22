const express = require('express');
var path = require('path');
var os = require("os");
const opn = require('opn');

var networkInterfaces = os.networkInterfaces();

const app = express();
const port = 3001;


app.all('*', function(req, res, next) {
    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();  
});


// // 加载静态资源
app.use(express.static(path.join(__dirname, './')));

app.get('/crm/manager/wx/listWxAccount', function (req, res) {
    let data = {
        "message":"success",
        "code":200,
        "timestamp":3213213212,
        "page":{
          "pageNo": 1,                        // #当前第几页
          "pageSize": 10,                     // #每页数量
          "total": 100                          // #总共记录数
        },
        "data":[
          {
            "id": 1,
          }
        ]
      }
    data = JSON.stringify(data);
    res.send(data);
 })  

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
  opn('http://localhost:3001', { app: ['chrome', '--incognito']});
  console.log('Https server listening on port ' + 3001);
});

