var Layer = require('./layer');

var Router = function () {
  this.stack = [
    new Layer('*', function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('404');
    })
  ]
}

Router.prototype.handle = function (req, res) {
  var router = this.stack;
  for (var i = 1, length = router.length; i < length; i++) {  //从 1 开始，匹配不到的话就匹配 通配符 * ，也就是第 0 个
    if (router[ i ].match(req.url)) {
      return router[ i ].request_handle(req, res);
    }
  }
  return router[ 0 ].request_handle(req, res);
};

Router.prototype.use = function (path, cb) {
  this.stack.push(new Layer(path, cb));
};

module.exports = Router;