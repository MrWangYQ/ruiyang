const express = require('express');
var path = require('path');
const app = express();
const port = 3001;

// 加载静态资源
app.use(express.static(path.join(__dirname, './')));

// 挂载路由
app.use('/index', function(req, res) {
  res.send('hello world');
});

// 监听端口
app.listen(port, function(parmas) {
  console.log('listen to ' + port);
})