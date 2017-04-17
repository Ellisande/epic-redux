import store from '../../../shared/store/store.js';
var roomConnection;
const connectionString = '/primus';

const dispatch = action => {
  if(!roomConnection){
    throw new Error('You cannot send events before connecting the websocket. Use connectToRoom to establish the connection');
  }
  roomConnection.write(action);
};

const attachEvents = connection => {
  connection.on('data', action => {
    if(action.type === 'JOIN_CHAT'){
      roomConnection.id(id => {
        action.userId = id;
      });
    }
    return store.dispatch(action);
  });
};

const connectToRoom = () => {
  roomConnection = new Primus(`${connectionString}`);
  attachEvents(roomConnection);
};

const disconnectFromRoom = () => roomConnection && roomConnection.destroy();

export {
  connectToRoom,
  dispatch,
  disconnectFromRoom
};
