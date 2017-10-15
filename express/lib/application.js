var http = require('http');
var Router = require('./router/index');

var Application = function () {
  this.router = new Router();
};

Application.prototype.use = function (path, cb) {
  this.router.use(path, cb);
};

Application.prototype.listen = function (port) {
  var self = this;
  http.createServer(function (req, res) {
    self.handle(req, res);
  }).listen(port);
};

Application.prototype.handle = function (req, res) {
  var router = this.router;
  return router.handle(req, res);
};



module.exports = Application;

