import express from 'express';
import {createServer as createHttpServer} from 'http';
import PrimusServer from 'primus';
import {shrinkMeeting, joinMeeting, addParticipant, removeParticipant, growMeeting, deleteMeeting, createMeeting, lockedOut, allowKnocking, disableKnocking, setRoomName} from '../shared/actions';
import _ from 'lodash';
import determineName from './utils';
import Room from './room';
import {afterActionMiddleware} from './middleware';

const createServer = () => {
  const app = express();
  const server = createHttpServer(app);

  app.use('/', express.static('assets'));

  var primus = new PrimusServer(server, {
    transformer: 'engine.io',
  });

  let meetingsRoom = new Room();
  let rooms = {};

  const addUserToMeeting = (spark, room) => {
    const {roomName} = room.store.getState();
    const remainingNames = room.store.getState().participants.map(p => p.name);

    const participant = {
      name: determineName(remainingNames, spark.id),
      id: spark.id,
      host: false
    };

    meetingsRoom.dispatch(growMeeting(roomName));
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
        meetingsRoom.dispatch(shrinkMeeting(roomForUser.store.getState().roomName));
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
      const deleteRoomMiddleware = afterActionMiddleware('DELETE_MEETING', (store, action) => {
        meetingsRoom.dispatch(deleteMeeting(roomName));
        delete rooms[roomName];
        return action;
      });
      if(!rooms[roomName]){
        rooms[roomName] = new Room(undefined, deleteRoomMiddleware);
        rooms[roomName].store.dispatch(setRoomName(roomName));
        meetingsRoom.dispatch(createMeeting(roomName));
      }
      const currentRoom = rooms[roomName];
      const currentStore = currentRoom.store;

      const attachEvents = sparkToAttach => {
        sparkToAttach.on('data', action => {
          action.userId = spark.id;
          currentRoom.dispatch(action);
          if(action.type === 'APPROVE_KNOCKER'){
            const findSpark = primus.spark(action.id);
            if(findSpark){
              findSpark.write(lockedOut(false));
              addUserToMeeting(findSpark, currentRoom);
            }
          }
          if(action.type === 'REJECT_KNOCKER'){
            const findSpark = primus.spark(action.id);
            findSpark && findSpark.write(deleteMeeting());
          }
        });
      };
      //Probably not how we want to handle this.
      attachEvents(spark);
      if(currentStore.getState().locked){
        const allowKnockingAction = currentStore.getState().allowKnocking ? allowKnocking() : disableKnocking();
        spark.write(allowKnockingAction);
        return spark.write(lockedOut(true));
      }

      addUserToMeeting(spark, currentRoom);
    }
  });

  app.get(/^(?!primus).+/, (req, res) => res.sendFile(`${process.cwd()}/assets/index.html`));

  return server;
};

export {createServer};
