import express from 'express';
import {createServer as createHttpServer} from 'http';
import PrimusServer from 'primus';
import Room from './room';

const createServer = () => {
  const app = express();
  const server = createHttpServer(app);

  app.use('/', express.static('assets'));

  var primus = new PrimusServer(server, {
    transformer: 'engine.io',
  });

  const chatRoom = new Room();

  primus.on('disconnection', function(spark){
    // Remove the user from the chat room
    chatRoom.removeUser(spark);
  });

  primus.on('connection', function (spark) {

    // When we get data from the socket
    // Dispatch it to the store
    // This is the heart of everything thats going on here
    spark.on('data', action => {
      action.userId = spark.id;
      chatRoom.dispatch(action);
    });

    // A new user connected, add them to our chat room
    chatRoom.addUser(spark);
  });

  app.get(/^(?!primus).+/, (req, res) => res.sendFile(`${process.cwd()}/assets/index.html`));

  return server;
};

export {createServer};
