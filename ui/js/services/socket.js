import store from '../../../shared/store/store.js';
var roomConnection;
const connectionString = '/primus';

const dispatch = action => {
  //I should write the action to the socket.
};

const connectToRoom = () => {
  roomConnection = new Primus(`${connectionString}`);
  roomConnection.on('data', action => {
    //This happens when the server sends me an action on the socket
    //I should probably do something with that action.
  });
};

const disconnectFromRoom = () => roomConnection && roomConnection.destroy();

export {
  connectToRoom,
  dispatch,
  disconnectFromRoom
};
