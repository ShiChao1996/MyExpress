var createApp = require('./express/lib/index');

var app = createApp();
app.use('/page', function (req, res) {
  console.log('req.url')
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('fsdfdnscmxnvcxvn');
})

app.listen(3000)