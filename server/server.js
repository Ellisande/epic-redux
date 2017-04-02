import express from 'express';
import {createServer as createHttpServer} from 'http';
import PrimusServer from 'primus';
import {joinMeeting, addParticipant, removeParticipant, setRoomName} from '../shared/actions';
import _ from 'lodash';
import determineName from './utils';
import Room from './room';

const createServer = () => {
  const app = express();
  const server = createHttpServer(app);

  app.use('/', express.static('assets'));

  var primus = new PrimusServer(server, {
    transformer: 'engine.io',
  });

  let rooms = {};

  const addUserToMeeting = (spark, room) => {
    const remainingNames = room.store.getState().participants.map(p => p.name);

    const participant = {
      name: determineName(remainingNames, spark.id),
      id: spark.id,
      host: false
    };

    room.addSpark(spark);
    room.dispatch(addParticipant(participant));

    spark.write(joinMeeting(room.store.getState()));
  };

  primus.on('disconnection', function(spark){
    if(spark.query.room) {
      const roomForUser = _.find(rooms, room => room.store.getState().participants.find(p => p.id === spark.id));
      if(roomForUser){
        roomForUser.dispatch(removeParticipant(spark.id));
        roomForUser.removeSpark(spark);
      }
    }
  });

  primus.on('connection', function (spark) {
    if(spark.query.room){
      const roomName = spark.query.room;
      if(!rooms[roomName]){
        rooms[roomName] = new Room(undefined);
        rooms[roomName].store.dispatch(setRoomName(roomName));
      }
      const currentRoom = rooms[roomName];

      const attachEvents = sparkToAttach => {
        sparkToAttach.on('data', action => {
          action.userId = spark.id;
          currentRoom.dispatch(action);
        });
      };

      attachEvents(spark);
      addUserToMeeting(spark, currentRoom);
    }
  });

  app.get(/^(?!primus).+/, (req, res) => res.sendFile(`${process.cwd()}/assets/index.html`));

  return server;
};

export {createServer};
