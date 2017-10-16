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

Application.prototype.get = function (path, cb) {
  var router = this.router;
  return router.get(path, cb);
};

Application.prototype.route = function (path) {
  var router = this.router;
  return router.route(path);
};



module.exports = Application;

