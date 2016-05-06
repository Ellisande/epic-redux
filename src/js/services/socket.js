import store from '../store/store.js';
var meetingsConnection;
var roomConnection;
const connectionString = process.env.HOST ? `https://${process.env.HOST}:${process.env.PORT}/primus` : 'http://localhost:3000/primus'


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
  if (roomConnection) {
    roomConnection.destroy();
  }
  roomConnection = new Primus(`${connectionString}?room=${safeRoomName}`);
  attachEvents(roomConnection);
};

const connectToMeetings = () => {
  if(meetingsConnection){
    meetingsConnection.destroy();
  }
  meetingsConnection = Primus.connect(`${connectionString}?meetings=true`);
  attachEvents(meetingsConnection);
};

const disconnectFromMeetings = () => {
  if(meetingsConnection){
    meetingsConnection.destroy();
  }
};

export {
  connectToRoom,
  connectToMeetings,
  disconnectFromMeetings,
  dispatch
};
