//router-layer
function Layer(path, handle) {
  this.handle = handle;
  this.path = path;
  this.name = handle.name || '<anonymous>';
}

Layer.prototype.match = function (path) {
  return this.path === path;
};

Layer.prototype.request_handle = function (req, res) {
  var handle = this.handle;
  handle && handle(req, res);
};

module.exports = Layer;