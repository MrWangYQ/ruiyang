const express = require('express');
var path = require('path');
const app = express();
const port = 3000;

// 加载静态资源
app.use(express.static(path.join(__dirname, './')));

// 监听端口
app.listen(port, function(parmas) {
  console.log('listen to http://localhost:' + port);
})