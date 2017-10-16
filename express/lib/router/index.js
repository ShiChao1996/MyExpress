var Layer = require('./layer');
var Route = require('./route');

var Router = function () {
  this.stack = [
    new Layer('*', function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('404');
    })
  ]
};

Router.prototype.handle = function (req, res) {
  var router = this.stack;
  //console.log("stack: ", router);
  for (var i = 1, length = router.length; i < length; i++) {  //从 1 开始，匹配不到的话就匹配 通配符 * ，也就是第 0 个
    if (router[ i ].match(req.url) && router[i].route.handle_method(req.method)) {
      console.log('router: ',router[i]);
      return router[ i ].request_handle(req, res);
    }
  }
  return router[ 0 ].request_handle(req, res);
};

Router.prototype.use = function (path, cb) {
  this.stack.push(new Layer(path, cb));
};

Router.prototype.get = function (path, fn) {
  var route = new Route(path);
  route.get(fn);

  var layer = new Layer(path, fn);
  layer.route = route;
  this.stack.push(layer);
  return this;
};

Router.prototype.route = function (path) {
  var route = new Route(path);
  var layer = new Layer(path, function (req, res) {
    route.dispatch(req, res);
  });

  layer.route = route;
  this.stack.push(layer);

  return route;
};

module.exports = Router;
