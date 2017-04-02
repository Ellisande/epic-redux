import store from '../../../shared/store/store.js';
var meetingsConnection;
var roomConnection;
const connectionString = '/primus';
import {browserHistory} from 'react-router';
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
      if(action.type === 'DELETE_MEETING'){
        browserHistory.push('/');
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

const connectToMeetings = () => {
  // meetingsConnection = Primus.connect(`${connectionString}?meetings=true`);
  // attachEvents(meetingsConnection);
};

const disconnectFromMeetings = () => {
  // if(meetingsConnection){
  //   meetingsConnection.destroy();
  // }
};

export {
  connectToRoom,
  connectToMeetings,
  disconnectFromMeetings,
  dispatch,
  disconnectFromRoom
};
