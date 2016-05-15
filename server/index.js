import express from 'express';
import {createServer} from 'http';
const app = express();
const server = createServer(app);
import PrimusServer from 'primus';
import {shrinkMeeting, joinMeeting, addParticipant, removeParticipant, growMeeting, deleteMeeting, createMeeting, lockedOut} from '../src/js/actions';
import _ from 'lodash';
import determineName from './utils';
import Room from './room';

app.use('/', express.static('assets'));

var primus = new PrimusServer(server, {
  transformer: 'engine.io',
});

let meetingsRoom = new Room();
let rooms = {};

primus.on('disconnection', function(spark){
  if(spark.query.room) {
    const roomForUser = _.find(rooms, room => room.store.getState().participants.find(p => p.id === spark.id));
    if(roomForUser){
      roomForUser.dispatchAndSend(removeParticipant(spark.id));
      roomForUser.removeSpark(spark);
      meetingsRoom.dispatchAndSend(shrinkMeeting(roomForUser.store.getState().roomName));
    }
  }
  if(spark.query.meetings){
    meetingsRoom.removeSpark(spark);
  }
});

primus.on('connection', function (spark) {
  if(spark.query.meetings){
    meetingsRoom.addSpark(spark);
    const setMeetings = {type: 'SET_MEETINGS', meetings: meetingsRoom.store.getState().meetings};
    spark.write(setMeetings);
    return;
  }
  if(spark.query.room){
    const roomName = spark.query.room;
    if(!rooms[roomName]){
      const room = {
        participants: [],
        topics: [],
        phase: 'submit',
        roomName,
        timer: 38000,
        locked: false,
        newHosts: true,
      };
      rooms[roomName] = new Room();
      rooms[roomName].store.dispatch(joinMeeting(room));
      meetingsRoom.dispatchAndSend(createMeeting(roomName));
    }
    const currentRoom = rooms[roomName];
    if(currentRoom.store.getState().locked){
      return spark.write(lockedOut(true));
    }

    const remainingNames = currentRoom.store.getState().participants.map(p => p.name);

    const participant = {
      name: determineName(remainingNames, spark.id),
      id: spark.id,
      host: false
    };

    meetingsRoom.dispatchAndSend(growMeeting(roomName));
    currentRoom.addSpark(spark);
    currentRoom.dispatchAndSend(addParticipant(participant));

    const currentStore = currentRoom.store;
    spark.write(joinMeeting(currentStore.getState()));
    spark.on('data', action => {
      currentRoom.dispatchAndSend(action);
      if(action.type === 'DELETE_MEETING'){
        delete rooms[roomName];
        meetingsRoom.dispatchAndSend(deleteMeeting(roomName));
      }
    });
  }
});

app.get(/^(?!primus).+/, (req, res) => res.sendFile(`${process.cwd()}/assets/index.html`));

const port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
