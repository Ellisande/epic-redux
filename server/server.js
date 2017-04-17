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

  const addUserToMeeting = (spark, room) => {
    const remainingNames = room.store.getState().participants.map(p => p.name);

    const participant = {
      name: determineName(remainingNames, spark.id),
      id: spark.id,
    };

    room.addSpark(spark);
    room.dispatch(addParticipant(participant));

    spark.write(joinMeeting(room.store.getState()));
  };

  primus.on('disconnection', function(spark){
    chatRoom.dispatch(removeParticipant(spark.id));
    chatRoom.removeSpark(spark);
  });

  primus.on('connection', function (spark) {
    const attachEvents = sparkToAttach => {
      sparkToAttach.on('data', action => {
        action.userId = spark.id;
        chatRoom.dispatch(action);
      });
    };

    attachEvents(spark);
    addUserToMeeting(spark, chatRoom);
  });

  app.get(/^(?!primus).+/, (req, res) => res.sendFile(`${process.cwd()}/assets/index.html`));

  return server;
};

export {createServer};
