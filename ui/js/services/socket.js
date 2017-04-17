import store from '../../../shared/store/store.js';
var roomConnection;
const connectionString = '/primus';
import {deleteMeeting} from '../../../shared/actions';


const dispatch = action => {
  if(!roomConnection){
    throw new Error('You cannot send events before connecting the websocket. Use connectToRoom to establish the connection');
  }
  roomConnection.write(action);
};

const attachEvents = connection => {
  connection.on('data', action => {
    if (action.type) {
      if(action.type === 'JOIN_MEETING'){
        roomConnection.id(id => {
          action.userId = id;
        });
      }
      return store.dispatch(action);
    }
  });
};

const connectToRoom = roomName => {
  const safeRoomName = decodeURI(roomName);
  roomConnection = new Primus(`${connectionString}?room=${safeRoomName}`);
  attachEvents(roomConnection);
};

const disconnectFromRoom = () => {
  store.dispatch(deleteMeeting());
  if(roomConnection){
    roomConnection.destroy();
  }
};

export {
  connectToRoom,
  dispatch,
  disconnectFromRoom
};
