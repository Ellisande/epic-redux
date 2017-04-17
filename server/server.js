import express from 'express';
import {createServer as createHttpServer} from 'http';
import PrimusServer from 'primus';
import {joinMeeting, addParticipant, removeParticipant} from '../shared/actions';
import determineName from './utils';
import Room from './room';

const createServer = () => {
  const app = express();
  const server = createHttpServer(app);

  app.use('/', express.static('assets'));

  var primus = new PrimusServer(server, {
    transformer: 'engine.io',
  });

  const chatRoom = new Room();

  // List of things to do when adding a new user to the chat
  const addUserToRoom = (spark, room) => {
    const usedNames = room.store.getState().participants.map(p => p.name);

    const participant = {
      name: determineName(usedNames, spark.id),
      id: spark.id,
    };

    // Add the socket connection to our chat room
    room.addSpark(spark);
    // Tell everyone that the person joined
    room.dispatch(addParticipant(participant));
    // Send the initial state to the new connection
    spark.write(joinMeeting(room.store.getState()));
  };

  primus.on('disconnection', function(spark){
    // Tell everyone the person left
    chatRoom.dispatch(removeParticipant(spark.id));
    // Remove the connection from our room
    chatRoom.removeSpark(spark);
  });

  primus.on('connection', function (spark) {
    const attachEvents = sparkToAttach => {
      sparkToAttach.on('data', action => {
        action.userId = spark.id;
        chatRoom.dispatch(action);
      });
    };

    // When we get data from the socket
    // Dispatch it to the store
    attachEvents(spark);

    // A new user connected, add them to our chat room
    addUserToRoom(spark, chatRoom);
  });

  app.get(/^(?!primus).+/, (req, res) => res.sendFile(`${process.cwd()}/assets/index.html`));

  return server;
};

export {createServer};
