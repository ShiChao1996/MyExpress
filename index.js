var createApp = require('./express/lib/index');

var app = createApp();
/*
app.use('/page', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('fsdfdnscmxnvcxvn');
});*/

app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
});

app.route('/book')
  .get(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Get a random book');
  });



app.listen(3000);