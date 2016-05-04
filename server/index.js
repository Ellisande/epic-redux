var express = require('express');
var app = express();
var server = require('http').createServer(app);
var PrimusServer = require('primus');
const store = require('../src/js/store/store').default;

app.use('/', express.static('assets'));

var primus = new PrimusServer(server, {
  transformer: 'engine.io',
});

primus.on('connection', function (spark) {
  spark.on('data', action => {
    store.dispatch(action);
    console.log('Sending', action);
    primus.write(action);
  });
});


app.get(/^(?!primus).+/, (req, res) => res.sendFile(`${process.cwd()}/assets/index.html`));

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
