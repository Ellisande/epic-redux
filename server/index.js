var express = require('express');
var app = express();
var server = require('http').createServer(app);
var PrimusServer = require('primus');
const store = require('../src/js/store/store').default;
const createNewStore = require('../src/js/store/store').createStore;
const joinMeeting = require('../src/js/actions').joinMeeting;

app.use('/', express.static('assets'));

var primus = new PrimusServer(server, {
  transformer: 'engine.io',
});

const rooms = {};

primus.on('connection', function (spark) {
  if(spark.query.meetings){
    spark.write({type: 'SET_MEETINGS', meetings: [{
      name: 'Bold Planning',
      participants: 100
    }]});
    return;
  }
  if(spark.query.room){
    console.log(spark.query.room);
    const roomName = spark.query.room;
    const participant = {
      name: spark.id,
      id: spark.id,
      host: true
    };
    const room = {
      participants: [participant],
      topics: [],
      phase: 'submit',
      roomName,
      timer: 38000,
      locked: false,
      newHosts: true,
    };
    rooms[roomName] = {sparks: [spark], store: createNewStore(room)};
    const currentStore = rooms[roomName].store;
    currentStore.dispatch(joinMeeting(room));
    console.log(joinMeeting(room));
    spark.write(joinMeeting(room));
    // Join meeting
    // spark.write('JOIN_MEETING')
    spark.on('data', action => {
      currentStore.dispatch(action);
      console.log('Sending', action);
      rooms[roomName].sparks.forEach(thisSpark => thisSpark.write(action));
    });
  }
});


app.get(/^(?!primus).+/, (req, res) => res.sendFile(`${process.cwd()}/assets/index.html`));

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
