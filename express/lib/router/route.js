var Layer = require('./layer');

var Route = function (path) {
  this.path = path;
  this.stack = [];
  this.methods = {};
};

Route.prototype.handle_method = function(method){
  var name = method.toString().toLowerCase();
  return Boolean(this.methods[name]);
};

Route.prototype.get = function(fn){
  var layer = new Layer('/', fn);
  layer.method = 'get';

  this.methods['get'] = true;
  this.stack.push(layer);
  //console.log('this route: ', this)
  return this;
};

Route.prototype.dispatch = function (req, res) {
  var self = this;
  var stack = this.stack;
  var method = req.method.toLowerCase();

  for(var i = 0, length = stack.length; i < length; i++){
    if(method === stack[i].method){
      return stack[i].handle(req, res);
    }
  }
};

module.exports = Route;