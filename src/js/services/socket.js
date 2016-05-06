import store from '../store/store.js';
var meetingsConnection;
var roomConnection;

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
    roomConnection.destory();
  }
  roomConnection = new Primus(`http://localhost:3000/primus?room=${safeRoomName}`);
  attachEvents(roomConnection);
};

const connectToMeetings = () => {
  if(meetingsConnection){
    meetingsConnection.destory();
  }
  meetingsConnection = Primus.connect('http://localhost:3000/primus?meetings=true');
  attachEvents(meetingsConnection);
};

export {
  connectToRoom,
  connectToMeetings,
  dispatch
};
