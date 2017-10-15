var http = require('http');

var Application = function () {
  this.router = [
    {
      path: '*',
      handle: function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('404');
      }
    }
  ]
}

Application.prototype.use = function (path, cb) {
  this.router.push({
    path: path,
    handle: cb
  })
}

Application.prototype.listen = function (port) {
  var self = this;
  http.createServer(function (req, res) {
    console.log(req.url)
    for(var i = 1, length = self.router.length; i < length; i++){  //从 1 开始，匹配不到的话就匹配 通配符 * ，也就是第 0 个
      if(req.url === self.router[i].path){
        return self.router[i].handle(req, res);
      }
    }
    return self.router[0].handle(req, res);
  }).listen(port);
}

module.exports = Application;
